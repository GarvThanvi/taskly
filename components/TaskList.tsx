"use client";

import Link from "next/link";
import type { Task } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteTaskButton from "@/components/delete-task-button";
import { TaskForm } from "@/components/task-form";
import { useDeleteTask, useTasks, useToggleTask } from "@/hooks/use-tasks";
import { toast } from "sonner";
import { useUiStore } from "@/store/ui-store";

const priorityVariant = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const;

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const { data: tasks = initialTasks } = useTasks(initialTasks);
  const { mutate: toggleTask } = useToggleTask();
  const { mutate: deleteTask } = useDeleteTask();

  const status = useUiStore((s) => s.status);
  const priority = useUiStore((s) => s.priority);
  const setStatus = useUiStore((s) => s.setStatus);
  const setPriority = useUiStore((s) => s.setPriority);


  const handleDelete = (id: string) => {
    deleteTask(
      { id },
      {
        onSuccess: () => toast.success("Task deleted"),
        onError: () => toast.error("Could not delete task"),
      }
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <TaskForm />

      {tasks.map((task) => (
        <div key={task.id} className="flex items-start gap-3">
          <Checkbox
            checked={task.done}
            onCheckedChange={(done) => toggleTask({ id: task.id, done })}
            aria-label={`Mark ${task.title} as ${
              task.done ? "not done" : "done"
            }`}
            className="mt-4"
          />

          <Link href={`/tasks/${task.id}`} className="flex-1">
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={
                      task.done ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {task.title}
                  </CardTitle>
                  <Badge
                    variant={
                      priorityVariant[
                        task.priority as keyof typeof priorityVariant
                      ]
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <CardDescription>{task.notes}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant={task.done ? "outline" : "secondary"}>
                  {task.done ? "Done" : "To do"}
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <DeleteTaskButton onDelete={() => handleDelete(task.id)} />
        </div>
      ))}
    </div>
  );
}
