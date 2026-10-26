import { create } from "zustand";
import { persist } from "zustand/middleware";

type Status = "all" | "active" | "done";
type Priority = "all" | "low" | "medium" | "high";

interface UiState {
  status: Status;
  priority: Priority;
  createOpen: boolean;
  setStatus: (s: Status) => void;
  setPriority: (p: Priority) => void;
  setCreateOpen: (open: boolean) => void;
  resetFilters: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      status: "all",
      priority: "all",
      createOpen: false,
      setStatus: (status) => set({ status }),
      setPriority: (priority) => set({ priority }),
      setCreateOpen: (createOpen) => set({ createOpen }),
      resetFilters: () => set({ status: "all", priority: "all" }),
    }),
    {
      name: "taskly-ui",
      partialize: (s) => ({ status: s.status, priority: s.priority }),
    }
  )
);
