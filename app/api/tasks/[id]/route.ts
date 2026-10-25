import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const bodySchema = z.object({ done: z.boolean() });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = bodySchema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const task = await db.task.update({ where: { id }, data: body.data });
  return NextResponse.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = await db.task.delete({ where: { id } });
  revalidatePath("/tasks");
  return NextResponse.json(task);
}
