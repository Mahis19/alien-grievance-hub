import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/file-complaint", label: "File Complaint" },
  { to: "/complaints", label: "Complaints" },
  { to: "/track", label: "Track Complaint" },
  { to: "/stats", label: "Galactic Stats" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [secret, setSecret] = useState(false);

  function tapLogo() {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5 && !secret) {
      setSecret(true);
      document.documentElement.classList.add("secret-mode");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
          <button
            type="button"
            onClick={tapLogo}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="Alien Complaint Portal home"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-primary/50 bg-secondary/40 text-lg shadow-[0_0_15px_var(--glow)]">
              👽
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base leading-none text-primary glow-text">
                ACP
              </span>
              <span className="label-mono block truncate">
                Alien Complaint Portal
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{
                      className: "text-primary border-primary/50 bg-secondary/40",
                    }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="rounded-md border border-transparent px-3 py-2 font-display text-[0.7rem] tracking-widest uppercase transition hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="hidden items-center gap-2 rounded-md border border-primary/40 px-3 py-2 xl:flex">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="label-mono text-primary">System Online</span>
            </span>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="animate-fade-in border-t border-border bg-background/95 px-4 py-3 lg:hidden">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-foreground" }}
                  className="block border-b border-border/50 py-3 font-display text-xs tracking-widest uppercase last:border-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <span className="label-mono text-primary">🟢 System Online</span>
            </li>
          </ul>
        )}
      </header>

      {secret && (
        <div className="animate-fade-in border-b border-primary/50 bg-secondary/50 px-4 py-2 text-center">
          <p className="font-display text-xs tracking-widest text-primary uppercase">
            Secret alien mode activated 👽
          </p>
          <p className="label-mono mt-1">We know you are human.</p>
        </div>
      )}
    </>
  );
}
