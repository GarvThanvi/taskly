import { Suspense } from "react";

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
  return <h1 className="text-2xl font-semibold">Task {id}</h1>;
}
