<?php
declare(strict_types=1);

// Copy this file to <directory above your web root>/private/counselling-config.php.
// Replace every placeholder, then restrict this file so only your PHP account can read it.
return [
    'db_host' => 'localhost',
    'db_port' => 3306,
    'db_name' => 'REPLACE_WITH_YOUR_DATABASE_NAME',
    'db_user' => 'REPLACE_WITH_YOUR_DATABASE_USER',
    'db_password' => 'REPLACE_WITH_YOUR_DATABASE_PASSWORD',
    'admin_token' => 'REPLACE_WITH_A_RANDOM_SECRET_TOKEN',
];