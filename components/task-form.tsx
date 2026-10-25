// "use client";
// import { createTask } from "@/actions/task";
// import { type TaskInput, taskSchema } from "@/lib/validations/task";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";

// export function TaskForm() {
//   const [pending, startTransition] = useTransition();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors },
//   } = useForm<TaskInput>({
//     resolver: zodResolver(taskSchema),
//     defaultValues: { title: "", priority: "medium" },
//   });
//   const onSubmit = (values: TaskInput) =>
//     startTransition(async () => {
//       const res = await createTask(values);
//       if (res.ok) {
//         reset();
//         toast.success("Task added");
//         return;
//       }
//       for (const [field, msgs] of Object.entries(res.errors)) {
//         setError(field as keyof TaskInput, { message: msgs?.[0] });
//       }
//     });
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//       <div>
//         <Label htmlFor="title">Title</Label>
//         <Input id="title" {...register("title")} />
//         {errors.title && (
//           <p className="text-sm text-destructive">{errors.title.message}</p>
//         )}
//       </div>
//       <select {...register("priority")} className="rounded-md border p-2">
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>
//       <Input type="date" {...register("dueDate")} />
//       <Button type="submit" disabled={pending}>
//         {pending ? "Saving..." : "Add task"}
//       </Button>
//     </form>
//   );
// }

"use client";
import { ActionResult, createTask } from "@/actions/task";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { tasksKey } from "@/hooks/use-tasks";

export function TaskForm() {
  const qc = useQueryClient();

  const actionFn = async (
    prevState: ActionResult | null,
    formData: FormData //this uses name: field in the input tags to get data
  ): Promise<ActionResult> => {
    const values = {
      title: formData.get("title") as string,
      priority: formData.get("priority") as string,
      dueDate: formData.get("dueDate") as string,
    };

    const res = await createTask(values);
    if (res.ok) qc.invalidateQueries({ queryKey: tasksKey });
    return res;
  };
  const [state, formAction, pending] = useActionState(actionFn, null);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Task added");
    }
  }, [state]);

  return (
    <form
      action={formAction}
      key={state?.ok ? Date.now() : "form"}
      className="space-y-3"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue="" />
        {state && !state.ok && state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title[0]}</p>
        )}
      </div>
      <select
        defaultValue="medium"
        name="priority"
        className="rounded-md border p-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <Input type="date" name="dueDate" />
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Add task"}
      </Button>
    </form>
  );
}
