import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  CATEGORIES,
  PLANETS,
  SEVERITY_LABELS,
  complaintStore,
  generateAlienId,
  type Complaint,
} from "@/lib/complaints";

export const Route = createFileRoute("/file-complaint")({
  head: () => ({
    meta: [
      { title: "Submit Your Complaint — Alien Complaint Portal" },
      {
        name: "description",
        content:
          "Official extraterrestrial grievance submission form. Tell us what went wrong on Earth; we will probably ignore it.",
      },
      { property: "og:title", content: "Submit Your Complaint — ACP" },
      {
        property: "og:description",
        content: "File an official off-world grievance about planet Earth.",
      },
    ],
  }),
  component: FileComplaintPage,
});

interface FormState {
  alienName: string;
  planet: string;
  alienId: string;
  category: string;
  title: string;
  description: string;
  severity: number;
  location: string;
}

const EMPTY: FormState = {
  alienName: "",
  planet: "",
  alienId: "",
  category: "",
  title: "",
  description: "",
  severity: 5,
  location: "",
};

const fieldClass =
  "mt-2 w-full rounded-md border border-input bg-background/70 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_15px_var(--glow)]";

function FileComplaintPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [confirmed, setConfirmed] = useState(false);
  const [evidence, setEvidence] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Complaint | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setEvidence(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setEvidence(String(reader.result));
    reader.readAsDataURL(file);
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.alienName.trim()) next.alienName = "An alien designation is required.";
    if (!form.planet) next.planet = "Select your planet of origin.";
    if (!form.category) next.category = "Select a grievance category.";
    if (!form.title.trim()) next.title = "A complaint title is required.";
    if (form.description.trim().length < 10)
      next.description = "Describe the incident in at least 10 Earth characters.";
    if (!confirmed) next.confirmed = "You must confirm your extraterrestrial status.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const complaint = await complaintStore.create({
      ...form,
      alienId: form.alienId.trim() || generateAlienId(),
      location: form.location.trim() || "Undisclosed Earth coordinates",
      evidence,
    });
    setSubmitted(complaint);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <div className="panel scanlines animate-scale-in p-8 text-center">
          <div className="mx-auto grid size-20 animate-pulse-ring place-items-center rounded-full border border-primary/60 bg-primary/10 text-4xl">
            🚀
          </div>
          <h1 className="mt-6 text-2xl text-primary glow-text sm:text-3xl">
            COMPLAINT SUCCESSFULLY TRANSMITTED.
          </h1>
          <p className="label-mono mt-4">Your complaint reference</p>
          <p className="font-mono text-3xl tracking-widest text-foreground">
            {submitted.id}
          </p>
          <div className="mt-6 border-t border-border/60 pt-6">
            <p className="label-mono">Estimated resolution time</p>
            <p className="font-display text-xl text-foreground">
              3–500 business years
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Your complaint has been escalated to Level 7 Intergalactic
              Authorities and is currently orbiting the appropriate department.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                navigate({ to: "/track", search: { id: submitted.id } })
              }
              className="flex-1 rounded-md bg-primary px-5 py-3.5 font-display text-xs tracking-widest text-primary-foreground uppercase transition hover:shadow-[0_0_22px_var(--glow)]"
            >
              Track Complaint
            </button>
            <Link
              to="/complaints"
              className="flex-1 rounded-md border border-primary/50 px-5 py-3.5 text-center font-display text-xs tracking-widest text-primary uppercase transition hover:bg-primary/10"
            >
              View Registry
            </Link>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setForm(EMPTY);
              setEvidence(null);
              setConfirmed(false);
            }}
            className="label-mono mt-6 hover:text-primary"
          >
            File another grievance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <p className="label-mono">Form 1-A / Intergalactic Grievance Intake</p>
      <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
        SUBMIT YOUR <span className="text-primary glow-text">COMPLAINT</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Tell us what went wrong on Earth. Our highly trained intergalactic
        support team will probably ignore it.
      </p>

      <form onSubmit={onSubmit} noValidate className="panel mt-8 space-y-6 p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Alien Name" error={errors.alienName}>
            <input
              className={fieldClass}
              placeholder="Zorp McZorp"
              value={form.alienName}
              onChange={(e) => set("alienName", e.target.value)}
            />
          </Field>

          <Field label="Planet" error={errors.planet}>
            <select
              className={fieldClass}
              value={form.planet}
              onChange={(e) => set("planet", e.target.value)}
            >
              <option value="">Select origin...</option>
              {PLANETS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Alien ID" hint="Optional — one will be assigned">
            <input
              className={fieldClass}
              placeholder="ALN-0000-X"
              value={form.alienId}
              onChange={(e) => set("alienId", e.target.value)}
            />
          </Field>

          <Field label="Complaint Category" error={errors.category}>
            <select
              className={fieldClass}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Complaint Title" error={errors.title}>
          <input
            className={fieldClass}
            placeholder="Earth WiFi is slower than intergalactic travel."
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>

        <Field label="Complaint Description" error={errors.description}>
          <textarea
            rows={5}
            className={`${fieldClass} resize-y`}
            placeholder="Describe the incident with excessive detail."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>

        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="label-mono">How serious is this?</span>
            <span className="font-display text-xs text-primary">
              {SEVERITY_LABELS[form.severity - 1]}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={form.severity}
            onChange={(e) => set("severity", Number(e.target.value))}
            aria-label="Severity"
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary/60 accent-primary"
          />
          <div className="mt-2 flex justify-between">
            <span className="label-mono">Not Important</span>
            <span className="label-mono text-right">The Galaxy is Doomed</span>
          </div>
        </div>

        <Field label="Location on Earth">
          <input
            className={fieldClass}
            placeholder="Behind a suspicious bush"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </Field>

        <div>
          <span className="label-mono">Upload Evidence (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="mt-2 w-full rounded-md border border-input bg-background/70 px-4 py-3 text-sm text-muted-foreground file:mr-3 file:rounded file:border-0 file:bg-primary/20 file:px-3 file:py-1.5 file:font-display file:text-[0.65rem] file:tracking-widest file:text-primary file:uppercase"
          />
          {evidence && (
            <div className="mt-3 overflow-hidden rounded-md border border-primary/40">
              <img
                src={evidence}
                alt="Preview of uploaded complaint evidence"
                className="max-h-64 w-full object-contain"
              />
            </div>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-3 border-t border-border/60 pt-5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              setErrors((err) => ({ ...err, confirmed: "" }));
            }}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span>
            I confirm that I am an extraterrestrial entity and this complaint is
            unnecessarily important.
          </span>
        </label>
        {errors.confirmed && (
          <p className="text-sm text-destructive">{errors.confirmed}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-6 py-4 font-display text-sm tracking-widest text-primary-foreground uppercase transition hover:shadow-[0_0_26px_var(--glow)]"
        >
          Transmit Complaint 🚀
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      {children}
      {hint && !error && <span className="label-mono mt-1 block">{hint}</span>}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
