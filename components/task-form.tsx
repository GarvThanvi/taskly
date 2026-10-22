"use client";
import { createTask } from "@/actions/task";
import { type TaskInput, taskSchema } from "@/lib/validations/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function TaskForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", priority: "medium" },
  });
  const onSubmit = (values: TaskInput) =>
    startTransition(async () => {
      const res = await createTask(values);
      if (res.ok) {
        reset();
        toast.success("Task added");
        return;
      }
      for (const [field, msgs] of Object.entries(res.errors)) {
        setError(field as keyof TaskInput, { message: msgs?.[0] });
      }
    });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <select {...register("priority")} className="rounded-md border p-2">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <Input type="date" {...register("dueDate")} />
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Add task"}
      </Button>
    </form>
  );
}
