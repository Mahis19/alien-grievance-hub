/**
 * Complaint data layer.
 *
 * Everything the UI needs goes through `complaintStore`. The current
 * implementation is backed by localStorage, but the API is async so a real
 * backend (server function / REST call) can replace `LocalComplaintStore`
 * without touching any component.
 */

export const PLANETS = [
  "Mars",
  "Venus",
  "Planet Zorp",
  "Kepler-452b",
  "Unknown Dimension",
  "Earth (unfortunately)",
] as const;

export const CATEGORIES = [
  "Humans",
  "Food",
  "Traffic",
  "Weather",
  "WiFi",
  "Government",
  "Earth Animals",
  "Dating Humans",
  "Gravity",
  "Other",
] as const;

export type Planet = (typeof PLANETS)[number];
export type Category = (typeof CATEGORIES)[number];

export type ComplaintStatus =
  | "RECEIVED"
  | "UNDER INVESTIGATION"
  | "FORWARDED TO GALACTIC COUNCIL"
  | "HUMAN ERROR"
  | "SOMEHOW RESOLVED";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "GALAXY-ENDING";

export const STATUSES: ComplaintStatus[] = [
  "RECEIVED",
  "UNDER INVESTIGATION",
  "FORWARDED TO GALACTIC COUNCIL",
  "HUMAN ERROR",
  "SOMEHOW RESOLVED",
];

export const STATUS_META: Record<
  ComplaintStatus,
  { dot: string; text: string; badge: string }
> = {
  RECEIVED: {
    dot: "bg-status-received",
    text: "text-status-received",
    badge: "border-status-received/40 bg-status-received/10",
  },
  "UNDER INVESTIGATION": {
    dot: "bg-status-investigating",
    text: "text-status-investigating",
    badge: "border-status-investigating/40 bg-status-investigating/10",
  },
  "FORWARDED TO GALACTIC COUNCIL": {
    dot: "bg-status-forwarded",
    text: "text-status-forwarded",
    badge: "border-status-forwarded/40 bg-status-forwarded/10",
  },
  "HUMAN ERROR": {
    dot: "bg-status-error",
    text: "text-status-error",
    badge: "border-status-error/40 bg-status-error/10",
  },
  "SOMEHOW RESOLVED": {
    dot: "bg-status-resolved",
    text: "text-status-resolved",
    badge: "border-status-resolved/40 bg-status-resolved/10",
  },
};

export interface Complaint {
  id: string;
  alienName: string;
  planet: string;
  alienId: string;
  category: string;
  title: string;
  description: string;
  severity: number; // 1..10
  location: string;
  evidence?: string | null; // data URL preview
  status: ComplaintStatus;
  priority: Priority;
  createdAt: string; // ISO
}

export type NewComplaint = Omit<
  Complaint,
  "id" | "status" | "priority" | "createdAt"
>;

export const SEVERITY_LABELS = [
  "Not Important",
  "Mildly Annoying",
  "Noticeably Irritating",
  "Formally Upsetting",
  "Escalation Warranted",
  "Deeply Concerning",
  "Regional Crisis",
  "Planetary Incident",
  "Galactic Emergency",
  "THE GALAXY IS DOOMED",
];

export function priorityFromSeverity(severity: number): Priority {
  if (severity >= 10) return "GALAXY-ENDING";
  if (severity >= 7) return "HIGH";
  if (severity >= 4) return "MEDIUM";
  return "LOW";
}

export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 89999);
  return `ALN-${year}-${n}`;
}

export function generateAlienId(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const n = Math.floor(1000 + Math.random() * 8999);
  return `ALN-${n}-${letters[Math.floor(Math.random() * letters.length)]}`;
}

export const USELESS_COMPLAINTS = [
  "My UFO does not have cup holders.",
  "Humans keep naming planets after Roman gods.",
  "The moon is following me.",
  "Earth squirrels are suspicious.",
  "Why is pineapple allowed on pizza?",
  "The sun is too bright.",
  "Gravity keeps pulling my spaceship down.",
  "Humans have too many reality shows.",
  "My tentacles don't fit standard gloves.",
  "Earth has insufficient parking for UFOs.",
  "Humans keep looking at the moon.",
  "Elevators refuse to go to floor 0.5.",
  "Earth clouds move without filing a flight plan.",
];

export const OFFICIAL_NONSENSE = [
  "Your complaint has been escalated to Level 7 Intergalactic Authorities.",
  "Human Affairs Department has been notified.",
  "Your request is currently orbiting the appropriate department.",
  "Resolution delayed due to Mercury being in retrograde.",
  "Complaint forwarded to Planetary Grievance Management.",
];

const STORAGE_KEY = "acp.complaints.v1";

const DEMO_COMPLAINTS: Complaint[] = [
  {
    id: "ALN-2026-48291",
    alienName: "Zorp",
    planet: "Planet Zorp",
    alienId: "ALN-0001-Z",
    category: "WiFi",
    title: "Earth WiFi is slower than intergalactic travel.",
    description:
      "I travelled 4.7 million light years but your WiFi still takes 3 minutes to load a video.",
    severity: 9,
    location: "Behind a suspicious bush",
    evidence: null,
    status: "UNDER INVESTIGATION",
    priority: "HIGH",
    createdAt: daysAgo(2),
  },
  {
    id: "ALN-2026-11204",
    alienName: "Blip Blorp",
    planet: "Mars",
    alienId: "ALN-0442-B",
    category: "Food",
    title: "Humans have incorrectly classified tomatoes.",
    description:
      "I demand an investigation into whether tomatoes are fruits, vegetables, or government surveillance devices.",
    severity: 6,
    location: "Aisle 4, Earth food warehouse",
    evidence: null,
    status: "FORWARDED TO GALACTIC COUNCIL",
    priority: "MEDIUM",
    createdAt: daysAgo(5),
  },
  {
    id: "ALN-2026-77310",
    alienName: "Xel-900",
    planet: "Kepler-452b",
    alienId: "ALN-9001-X",
    category: "Traffic",
    title: "Why does everyone drive on the same road?",
    description:
      "There are 8 billion humans and apparently only one functional road.",
    severity: 7,
    location: "Ring road, unknown megacity",
    evidence: null,
    status: "RECEIVED",
    priority: "HIGH",
    createdAt: daysAgo(1),
  },
  {
    id: "ALN-2026-30528",
    alienName: "Gronk",
    planet: "Unknown Dimension",
    alienId: "ALN-3052-G",
    category: "Weather",
    title: "Earth weather makes no logical sense.",
    description:
      "Sunny at 2 PM. Rain at 2:03 PM. Extremely suspicious planet.",
    severity: 5,
    location: "A damp field",
    evidence: null,
    status: "HUMAN ERROR",
    priority: "MEDIUM",
    createdAt: daysAgo(9),
  },
  {
    id: "ALN-2026-66019",
    alienName: "Zorg",
    planet: "Venus",
    alienId: "ALN-6601-Q",
    category: "Humans",
    title: "Human keeps asking if I am from China.",
    description: "I am from 14 galaxies away.",
    severity: 4,
    location: "A bus stop",
    evidence: null,
    status: "SOMEHOW RESOLVED",
    priority: "MEDIUM",
    createdAt: daysAgo(14),
  },
  {
    id: "ALN-2026-51477",
    alienName: "Plumbus-7",
    planet: "Mars",
    alienId: "ALN-5147-P",
    category: "Gravity",
    title: "Gravity is unnecessarily strong.",
    description:
      "Please reduce gravity by 12%. My spaceship insurance does not cover this.",
    severity: 10,
    location: "Crater near a parking lot",
    evidence: null,
    status: "UNDER INVESTIGATION",
    priority: "GALAXY-ENDING",
    createdAt: daysAgo(3),
  },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export interface ComplaintStore {
  list(): Promise<Complaint[]>;
  get(id: string): Promise<Complaint | undefined>;
  create(input: NewComplaint): Promise<Complaint>;
}

class LocalComplaintStore implements ComplaintStore {
  private read(): Complaint[] {
    if (typeof window === "undefined") return DEMO_COMPLAINTS;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_COMPLAINTS));
        return DEMO_COMPLAINTS;
      }
      const parsed = JSON.parse(raw) as Complaint[];
      return Array.isArray(parsed) && parsed.length ? parsed : DEMO_COMPLAINTS;
    } catch {
      return DEMO_COMPLAINTS;
    }
  }

  private write(items: Complaint[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("acp:complaints-updated"));
  }

  async list(): Promise<Complaint[]> {
    return this.read().sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  }

  async get(id: string): Promise<Complaint | undefined> {
    const target = id.trim().toUpperCase();
    return this.read().find((c) => c.id.toUpperCase() === target);
  }

  async create(input: NewComplaint): Promise<Complaint> {
    const complaint: Complaint = {
      ...input,
      id: generateComplaintId(),
      status: "RECEIVED",
      priority: priorityFromSeverity(input.severity),
      createdAt: new Date().toISOString(),
    };
    this.write([complaint, ...this.read()]);
    return complaint;
  }
}

export const complaintStore: ComplaintStore = new LocalComplaintStore();

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
