"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@prisma/client";
import { boolean } from "zod";

export const tasksKey = ["tasks"] as const;

export function useTasks(initialData?: Task[]) {
  return useQuery({
    queryKey: tasksKey,
    queryFn: async (): Promise<Task[]> => {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("failed to load tasks");
      return res.json();
    },
    initialData,
  });
}

export function useToggleTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });
      if (!res.ok) throw new Error("update failed");
      return res.json();
    },
    onMutate: async ({ id, done }) => {
      await qc.cancelQueries({ queryKey: tasksKey });
      const previous = qc.getQueryData<Task[]>(tasksKey);
      qc.setQueryData<Task[]>(tasksKey, (old: Task[]) =>
        old?.map((t) => (t.id === id ? { ...t, done } : t))
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => qc.setQueryData(tasksKey, ctx?.previous),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: tasksKey });
    },
  });
}
