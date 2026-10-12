import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  KeyRound,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Enquiry = {
  id: number | string;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string;
  qualification: string | null;
  course: string | null;
  created_at: string;
};

type EnquiryFields = Omit<Enquiry, "id" | "created_at">;
type ApiResult = { message?: string; error?: string; id?: number; data?: Enquiry[] | Enquiry };

const apiUrl = `${import.meta.env.BASE_URL}api/counselling.php`;
const inputClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring";
const courses = ["Networking & CCNA", "Microsoft Azure Cloud", "Cyber Security", "Generative AI", "AI Agents"];
const blankFields: EnquiryFields = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  qualification: "",
  course: courses[0],
};

async function readResponse(response: Response): Promise<ApiResult> {
  const result: unknown = await response.json().catch(() => null);
  if (typeof result === "object" && result !== null) return result as ApiResult;
  return {};
}

function toFields(enquiry: Enquiry): EnquiryFields {
  return {
    name: enquiry.name,
    phone: enquiry.phone,
    whatsapp: enquiry.whatsapp ?? "",
    email: enquiry.email,
    qualification: enquiry.qualification ?? "",
    course: enquiry.course ?? "",
  };
}

function formatDate(value: string) {
  const date = new Date(value.replace(" ", "T") + (value.endsWith("Z") ? "" : "Z"));
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function CounsellingAdminPage() {
  const [token, setToken] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [fields, setFields] = useState<EnquiryFields>(blankFields);

  const filteredEnquiries = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    if (!term) return enquiries;
    return enquiries.filter((enquiry) =>
      [enquiry.name, enquiry.phone, enquiry.whatsapp, enquiry.email, enquiry.qualification, enquiry.course]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase().includes(term)),
    );
  }, [enquiries, search]);

  const loadEnquiries = async (adminToken = token) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${apiUrl}?limit=500`, {
        headers: { Authorization: `Bearer ${adminToken}`, Accept: "application/json" },
        cache: "no-store",
      });
      const result = await readResponse(response);
      if (response.status === 401 || response.status === 403) {
        setAuthorized(false);
        setError("That administrator token was not accepted. Check it and try again.");
        return false;
      }
      if (!response.ok || !Array.isArray(result.data)) {
        setError(result.error ?? "Enquiries could not be loaded. Check that the PHP/MySQL service is online.");
        return false;
      }
      setEnquiries(result.data);
      setAuthorized(true);
      return true;
    } catch {
      setError("Could not reach the enquiry service. Check your connection and try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token.trim()) {
      setError("Enter the administrator token to continue.");
      return;
    }
    await loadEnquiries(token.trim());
  };

  const startCreate = () => {
    setEditingId(null);
    setFields({ ...blankFields });
    setMessage("");
    setError("");
    setFormOpen(true);
  };

  const startEdit = (enquiry: Enquiry) => {
    setEditingId(enquiry.id);
    setFields(toFields(enquiry));
    setMessage("");
    setError("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const payload = {
      ...fields,
      whatsapp: fields.whatsapp?.trim() ?? "",
      qualification: fields.qualification?.trim() ?? "",
      course: fields.course?.trim() ?? "",
    };

    try {
      const response = await fetch(
        editingId === null ? apiUrl : `${apiUrl}?id=${encodeURIComponent(String(editingId))}`,
        {
          method: editingId === null ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(editingId === null ? {} : { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        },
      );
      const result = await readResponse(response);
      if (response.status === 401 || response.status === 403) {
        setAuthorized(false);
        setError("Your administrator token expired or was rejected. Enter it again to continue.");
        return;
      }
      if (!response.ok || (editingId === null && typeof result.id !== "number")) {
        setError(result.error ?? "The enquiry could not be saved. Check the form and try again.");
        return;
      }

      const wasEditing = editingId !== null;
      closeForm();
      if (wasEditing) {
        setMessage("Enquiry updated.");
        await loadEnquiries();
      } else {
        setMessage("Enquiry added.");
        await loadEnquiries();
      }
    } catch {
      setError("Could not reach the enquiry service. Nothing has been confirmed as saved.");
    } finally {
      setSaving(false);
    }
  };

  const removeEnquiry = async (enquiry: Enquiry) => {
    const confirmed = window.confirm(`Delete the enquiry from ${enquiry.name}? This cannot be undone.`);
    if (!confirmed) return;

    setError("");
    setMessage("");
    try {
      const response = await fetch(`${apiUrl}?id=${encodeURIComponent(String(enquiry.id))}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const result = await readResponse(response);
      if (response.status === 401 || response.status === 403) {
        setAuthorized(false);
        setError("Your administrator token expired or was rejected. Enter it again to continue.");
        return;
      }
      if (!response.ok) {
        setError(result.error ?? "The enquiry could not be deleted.");
        return;
      }

      setEnquiries((current) => current.filter((item) => item.id !== enquiry.id));
      setMessage("Enquiry deleted.");
    } catch {
      setError("Could not reach the enquiry service. The enquiry was not confirmed as deleted.");
    }
  };

  const logout = () => {
    setToken("");
    setAuthorized(false);
    setEnquiries([]);
    setSearch("");
    setMessage("");
    setError("");
    closeForm();
  };

  return (
    <div className="page-wash min-h-screen text-ink">
      <header className="border-b border-glass-border bg-glass/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-2" aria-label="Luna Solutions home">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-brand-foreground">L</span>
            <span className="truncate font-display text-base font-extrabold">Luna<span className="text-accent"> Solutions</span></span>
          </a>
          <a href="/" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-ink">
            <ArrowLeft aria-hidden="true" className="size-4" /> <span className="hidden sm:inline">Back to website</span><span className="sm:hidden">Home</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 sm:pt-14">
        {!authorized ? (
          <section className="mx-auto max-w-lg py-10" aria-labelledby="admin-heading">
            <div className="mb-6 grid size-12 place-items-center rounded-lg bg-brand text-brand-foreground"><KeyRound aria-hidden="true" /></div>
            <p className="text-sm font-semibold text-accent">Luna Solutions · Private area</p>
            <h1 id="admin-heading" className="mt-2 font-display text-3xl font-extrabold">Counselling enquiries</h1>
            <p className="mt-3 leading-6 text-muted-foreground">Enter your administrator token to securely open the enquiry register.</p>
            <form onSubmit={handleUnlock} className="mt-7 space-y-4">
              <label className="block text-sm font-semibold" htmlFor="admin-token">Administrator token
                <input
                  autoComplete="current-password"
                  className={inputClass}
                  id="admin-token"
                  name="admin-token"
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Enter your private token"
                  required
                  type="password"
                  value={token}
                />
              </label>
              {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" disabled={loading || !token.trim()} className="w-full">
                {loading ? <><Loader2 className="animate-spin" /> Checking access…</> : <><ShieldCheck /> Open enquiries</>}
              </Button>
            </form>
          </section>
        ) : (
          <>
            <div className="flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold text-accent">Luna Solutions · Management</p>
                <h1 id="admin-heading" className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Counselling enquiries</h1>
                <p className="mt-2 text-muted-foreground">{enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="outline" onClick={() => void loadEnquiries()} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />} Refresh
                </Button>
                <Button type="button" onClick={startCreate}><Plus /> New enquiry</Button>
                <Button type="button" variant="ghost" size="icon" aria-label="Lock and sign out" title="Lock and sign out" onClick={logout}><LogOut /></Button>
              </div>
            </div>

            {message && <p role="status" className="mt-5 flex items-center gap-2 text-sm font-semibold text-foreground"><Check className="size-4 text-accent" />{message}</p>}
            {error && <p role="alert" className="mt-5 text-sm font-medium text-destructive">{error}</p>}

            {formOpen && (
              <section className="mt-7 border-b border-border pb-8" aria-labelledby="enquiry-form-heading">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-accent">{editingId === null ? "Create record" : `Enquiry #${editingId}`}</p>
                    <h2 id="enquiry-form-heading" className="mt-1 font-display text-2xl font-bold">{editingId === null ? "New enquiry" : "Edit enquiry"}</h2>
                  </div>
                  <Button type="button" variant="ghost" size="icon" aria-label="Close form" onClick={closeForm}><X /></Button>
                </div>
                <form onSubmit={handleSave} className="grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="text-sm font-semibold">Full name<input required maxLength={120} className={inputClass} value={fields.name} onChange={(event) => setFields({ ...fields, name: event.target.value })} /></label>
                  <label className="text-sm font-semibold">Phone number<input required maxLength={30} type="tel" className={inputClass} value={fields.phone} onChange={(event) => setFields({ ...fields, phone: event.target.value })} /></label>
                  <label className="text-sm font-semibold">WhatsApp number<input maxLength={30} type="tel" className={inputClass} value={fields.whatsapp ?? ""} onChange={(event) => setFields({ ...fields, whatsapp: event.target.value })} /></label>
                  <label className="text-sm font-semibold">Email address<input required maxLength={254} type="email" className={inputClass} value={fields.email} onChange={(event) => setFields({ ...fields, email: event.target.value })} /></label>
                  <label className="text-sm font-semibold">Qualification<input maxLength={255} className={inputClass} value={fields.qualification ?? ""} onChange={(event) => setFields({ ...fields, qualification: event.target.value })} /></label>
                  <label className="text-sm font-semibold">Course interested in
                    <span className="relative mt-1.5 block">
                      <select className={`${inputClass} appearance-none pr-10`} value={fields.course ?? ""} onChange={(event) => setFields({ ...fields, course: event.target.value })}>
                        <option value="">Select a course</option>
                        {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                      </select>
                      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                    </span>
                  </label>
                  <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
                    <Button type="submit" disabled={saving}>{saving ? <><Loader2 className="animate-spin" /> Saving…</> : <><Check /> {editingId === null ? "Create enquiry" : "Save changes"}</>}</Button>
                    <Button type="button" variant="outline" onClick={closeForm} disabled={saving}>Cancel</Button>
                  </div>
                </form>
              </section>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-sm">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input className={`${inputClass} pl-9`} type="search" placeholder="Search enquiries" aria-label="Search enquiries" value={search} onChange={(event) => setSearch(event.target.value)} />
              </label>
              <span className="text-sm text-muted-foreground">Showing {filteredEnquiries.length} of {enquiries.length}</span>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-background/70">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/70 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Contact</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Qualification</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading && enquiries.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground"><span className="inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin" />Loading enquiries…</span></td></tr>
                  ) : filteredEnquiries.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">{search ? "No enquiries match your search." : "No enquiries yet."}</td></tr>
                  ) : filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="align-top transition-colors hover:bg-muted/40">
                      <td className="px-4 py-4"><p className="font-semibold text-foreground">{enquiry.name}</p><p className="mt-1 text-xs text-muted-foreground">#{enquiry.id}</p></td>
                      <td className="max-w-56 px-4 py-4"><a className="block truncate font-medium text-foreground hover:underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a><p className="mt-1 text-muted-foreground">{enquiry.phone}</p>{enquiry.whatsapp && <p className="mt-1 text-xs text-muted-foreground">WhatsApp · {enquiry.whatsapp}</p>}</td>
                      <td className="px-4 py-4">{enquiry.course || <span className="text-muted-foreground">—</span>}</td>
                      <td className="px-4 py-4 text-muted-foreground">{enquiry.qualification || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">{formatDate(enquiry.created_at)}</td>
                      <td className="px-4 py-3"><div className="flex justify-end gap-1">
                        <Button type="button" variant="ghost" size="icon" aria-label={`Edit ${enquiry.name}`} title="Edit enquiry" onClick={() => startEdit(enquiry)}><Pencil /></Button>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Delete ${enquiry.name}`} title="Delete enquiry" className="text-destructive hover:text-destructive" onClick={() => void removeEnquiry(enquiry)}><Trash2 /></Button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}