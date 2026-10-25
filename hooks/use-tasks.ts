"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@prisma/client";

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
    //actual api call it should throw error in case of error
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });
      if (!res.ok) throw new Error("update failed");
      return res.json();
    },
    //optimistic updates --> runs before mutation fn and immediately updates ui
    onMutate: async ({ id, done }) => {
      await qc.cancelQueries({ queryKey: tasksKey });
      const previous = qc.getQueryData<Task[]>(tasksKey);
      qc.setQueryData<Task[]>(tasksKey, (old: Task[]) =>
        old?.map((t) => (t.id === id ? { ...t, done } : t))
      );
      return { previous };
    },
    //if error gets thrown in api call then set data in cache as previous one
    onError: (_err, _vars, ctx) => qc.setQueryData(tasksKey, ctx?.previous),
    //marks data stale and refetches new data
    onSettled: () => {
      qc.invalidateQueries({ queryKey: tasksKey });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      return res.json();
    },
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: tasksKey });
      const previous = qc.getQueryData<Task[]>(tasksKey);
      qc.setQueryData<Task[]>(tasksKey, (old: Task[] | undefined) => {
        old?.filter((t) => t.id !== id);
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(tasksKey, ctx?.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: tasksKey });
    },
  });
}
