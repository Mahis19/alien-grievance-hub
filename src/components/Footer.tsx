import { Link } from "@tanstack/react-router";
import { EmergencyButton } from "./EmergencyButton";

const STATUS = [
  "🌎 Earth Server: ONLINE",
  "🛸 UFO Detection: ACTIVE",
  "👽 Alien Support: QUESTIONABLE",
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-sm text-primary glow-text">
              ALIEN COMPLAINT PORTAL © 2026
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              "Serving extraterrestrials since absolutely never."
            </p>
            <p className="label-mono mt-4">
              Ministry of Off-World Grievances / Sector 51
            </p>
          </div>

          <div>
            <p className="label-mono">Official Documents</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/track" className="text-muted-foreground hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-muted-foreground hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-muted-foreground hover:text-primary">
                  Galactic Constitution
                </Link>
              </li>
              <li>
                <Link
                  to="/file-complaint"
                  className="text-muted-foreground hover:text-primary"
                >
                  Report a Human
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono">Infrastructure</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {STATUS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <EmergencyButton className="mt-5 w-full text-[0.65rem]" />
          </div>
        </div>

        <p className="label-mono mt-10 border-t border-border/60 pt-6 text-center">
          Officially recognized by absolutely nobody.
        </p>
      </div>
    </footer>
  );
}
