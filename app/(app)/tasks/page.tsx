// src/app/tasks/page.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTasks } from "@/lib/tasks";
import TaskList from "@/components/TaskList";

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <TaskList initialTasks={tasks}/>
  );
}
