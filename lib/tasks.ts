import "server-only";
import { db } from "./db";

export function getTasks() {
  return db.task.findMany({ orderBy: { createdAt: "desc" } });
}

export function getTask(id: string) {
  return db.task.findUnique({ where: { id } });
}
