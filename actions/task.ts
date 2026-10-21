"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { taskSchema, updateTaskSchema } from "@/lib/validations/task";

export type ActionResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[] | undefined> };

export async function createTask(input: unknown): Promise<ActionResult> {
  const parsed = taskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  }
  const { dueDate, ...rest } = parsed.data;
  await db.task.create({
    data: { ...rest, dueDate: dueDate ? new Date(dueDate) : null },
  });
  revalidatePath("/tasks");
  return { ok: true };
}

export async function updateTask(
  id: string,
  input: unknown
): Promise<ActionResult> {
  const parsed = updateTaskSchema.safeParse(input);
  const parsedId = z.string().min(1).parse(id);
  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  }
  const { dueDate, ...rest } = parsed.data;
  await db.task.update({
    where: { id: parsedId },
    data: {
      ...rest,
      ...(dueDate !== undefined && {
        dueDate: dueDate ? new Date(dueDate) : null,
      }),
    },
  });
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${parsedId}`);
  return { ok: true };
}

export async function deleteTask(id: string) {
  const parsedId = z.string().min(1).parse(id);
  await db.task.delete({ where: { id: parsedId } });
  revalidatePath("/tasks");
}
