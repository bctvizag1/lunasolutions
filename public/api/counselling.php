<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 16384) {
        respond(413, ['error' => 'Request body is too large.']);
    }

    $body = json_decode($raw, true);
    if (!is_array($body) || array_is_list($body)) {
        respond(400, ['error' => 'Send a JSON object.']);
    }

    return $body;
}

function clean_text(mixed $value, string $field, int $maxLength, bool $required = false): ?string
{
    if (!is_string($value)) {
        respond(400, ['error' => "Invalid {$field}."]);
    }

    $value = trim($value);
    if ($value === '') {
        if ($required) {
            respond(400, ['error' => "{$field} is required."]);
        }
        return null;
    }

    if (mb_strlen($value) > $maxLength) {
        respond(400, ['error' => "{$field} is too long."]);
    }

    return $value;
}

function validated_fields(array $body, bool $partial = false): array
{
    $allowed = ['name', 'phone', 'whatsapp', 'email', 'qualification', 'course'];
    foreach ($body as $key => $_value) {
        if (!in_array($key, $allowed, true)) {
            respond(400, ['error' => 'The request contains an unknown field.']);
        }
    }

    $required = $partial ? [] : ['name', 'phone', 'email'];
    foreach ($required as $key) {
        if (!array_key_exists($key, $body)) {
            respond(400, ['error' => "{$key} is required."]);
        }
    }

    $limits = [
        'name' => 120,
        'phone' => 30,
        'whatsapp' => 30,
        'email' => 254,
        'qualification' => 255,
        'course' => 100,
    ];
    $fields = [];

    foreach ($body as $key => $value) {
        $cleaned = clean_text($value, $key, $limits[$key], in_array($key, $required, true));

        if ($key === 'email' && $cleaned !== null && filter_var($cleaned, FILTER_VALIDATE_EMAIL) === false) {
            respond(400, ['error' => 'Enter a valid email address.']);
        }
        if (in_array($key, ['phone', 'whatsapp'], true) && $cleaned !== null && !preg_match('/^[0-9+().\s-]+$/', $cleaned)) {
            respond(400, ['error' => "Enter a valid {$key} number."]);
        }
        if ($key === 'course' && $cleaned !== null && !in_array($cleaned, [
            'Networking & CCNA',
            'Microsoft Azure Cloud',
            'Cyber Security',
            'Generative AI',
            'AI Agents',
        ], true)) {
            respond(400, ['error' => 'Choose a valid course.']);
        }

        $fields[$key] = $cleaned;
    }

    return $fields;
}

function require_admin(array $config): void
{
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!is_string($authorization) || !preg_match('/^Bearer\s+(.+)$/i', $authorization, $matches)) {
        respond(401, ['error' => 'Administrator authorization is required.']);
    }

    $expected = (string) ($config['admin_token'] ?? '');
    if ($expected === '' || hash_equals($expected, trim($matches[1])) === false) {
        respond(401, ['error' => 'Administrator authorization is invalid.']);
    }
}

function enquiry_id(): int
{
    $id = $_GET['id'] ?? null;
    if (!is_string($id) || !ctype_digit($id) || (int) $id < 1) {
        respond(400, ['error' => 'A valid enquiry id is required.']);
    }

    return (int) $id;
}

$configPath = dirname(__DIR__, 2) . '/private/counselling-config.php';
if (!is_file($configPath)) {
    error_log('Counselling API configuration file is missing.');
    respond(503, ['error' => 'Enquiry service is not configured yet.']);
}

$config = require $configPath;
if (!is_array($config)) {
    error_log('Counselling API configuration file is invalid.');
    respond(503, ['error' => 'Enquiry service is not configured yet.']);
}

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
if (!in_array($method, ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], true)) {
    header('Allow: GET, POST, PATCH, PUT, DELETE');
    respond(405, ['error' => 'Method not allowed.']);
}
if ($method !== 'POST') {
    require_admin($config);
}

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['db_host'] ?? 'localhost',
        (int) ($config['db_port'] ?? 3306),
        $config['db_name'] ?? ''
    );
    $pdo = new PDO($dsn, $config['db_user'] ?? '', $config['db_password'] ?? '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    if ($method === 'POST') {
        $fields = validated_fields(read_json_body());
        $statement = $pdo->prepare(
            'INSERT INTO counselling_enquiries (name, phone, whatsapp, email, qualification, course)
             VALUES (:name, :phone, :whatsapp, :email, :qualification, :course)'
        );
        $statement->execute([
            'name' => $fields['name'],
            'phone' => $fields['phone'],
            'whatsapp' => $fields['whatsapp'] ?? null,
            'email' => $fields['email'],
            'qualification' => $fields['qualification'] ?? null,
            'course' => $fields['course'] ?? null,
        ]);

        respond(201, ['message' => 'Enquiry saved.', 'id' => (int) $pdo->lastInsertId()]);
    }

    if ($method === 'GET') {
        if (array_key_exists('id', $_GET)) {
            $statement = $pdo->prepare('SELECT id, name, phone, whatsapp, email, qualification, course, created_at FROM counselling_enquiries WHERE id = :id');
            $statement->execute(['id' => enquiry_id()]);
            $row = $statement->fetch();
            if ($row === false) {
                respond(404, ['error' => 'Enquiry not found.']);
            }
            respond(200, ['data' => $row]);
        }

        $limit = filter_var($_GET['limit'] ?? '100', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 500]]);
        if ($limit === false) {
            respond(400, ['error' => 'Limit must be between 1 and 500.']);
        }
        $statement = $pdo->query(
            'SELECT id, name, phone, whatsapp, email, qualification, course, created_at
             FROM counselling_enquiries ORDER BY created_at DESC, id DESC LIMIT ' . (int) $limit
        );
        respond(200, ['data' => $statement->fetchAll()]);
    }

    if ($method === 'PATCH' || $method === 'PUT') {
        $fields = validated_fields(read_json_body(), $method === 'PATCH');
        if ($fields === []) {
            respond(400, ['error' => 'Provide at least one field to update.']);
        }

        $sets = [];
        foreach ($fields as $key => $_value) {
            $sets[] = "{$key} = :{$key}";
        }
        $statement = $pdo->prepare(
            'UPDATE counselling_enquiries SET ' . implode(', ', $sets) . ' WHERE id = :id'
        );
        $fields['id'] = enquiry_id();
        $statement->execute($fields);
        if ($statement->rowCount() === 0) {
            $exists = $pdo->prepare('SELECT id FROM counselling_enquiries WHERE id = :id');
            $exists->execute(['id' => $fields['id']]);
            if ($exists->fetch() === false) {
                respond(404, ['error' => 'Enquiry not found.']);
            }
        }
        respond(200, ['message' => 'Enquiry updated.']);
    }

    if ($method === 'DELETE') {
        $statement = $pdo->prepare('DELETE FROM counselling_enquiries WHERE id = :id');
        $statement->execute(['id' => enquiry_id()]);
        if ($statement->rowCount() === 0) {
            respond(404, ['error' => 'Enquiry not found.']);
        }
        respond(200, ['message' => 'Enquiry deleted.']);
    }

} catch (PDOException $error) {
    error_log('Counselling API database error: ' . $error->getMessage());
    respond(500, ['error' => 'The enquiry could not be processed. Please try again.']);
} catch (Throwable $error) {
    error_log('Counselling API error: ' . $error->getMessage());
    respond(500, ['error' => 'The enquiry could not be processed. Please try again.']);
}