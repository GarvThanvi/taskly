import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  notes: z.string().max(500).optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;

export const updateTaskSchema = taskSchema.partial();
export type TaskUpdate = z.infer<typeof updateTaskSchema>;
