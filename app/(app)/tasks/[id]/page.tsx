import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { getTask } from "@/lib/tasks";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TaskContent params={params}></TaskContent>
    </Suspense>
  );
}

async function TaskContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await getTask(id);
  if (!task) return notFound();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{task.title}</h1>
      <p className="text-muted-foreground">{task.notes}</p>
      <Badge>{task.priority}</Badge>
    </div>
  );
}
