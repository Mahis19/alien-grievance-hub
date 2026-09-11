import { useCallback, useEffect, useState } from "react";
import { complaintStore, type Complaint } from "@/lib/complaints";

/** Reads complaints on the client and stays in sync with new submissions. */
export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    let active = true;
    complaintStore.list().then((items) => {
      if (!active) return;
      setComplaints(items);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = refresh();
    const onUpdate = () => refresh();
    window.addEventListener("acp:complaints-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      cleanup();
      window.removeEventListener("acp:complaints-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);

  return { complaints, loading, refresh };
}
