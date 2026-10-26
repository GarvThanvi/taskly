"use client";
import { useUiStore } from "@/store/ui-store";
import { Button } from "./ui/button";

export default function ToggleCreate() {
  const createOpen = useUiStore((s) => s.createOpen);
  const setCreateOpen = useUiStore((s) => s.setCreateOpen);
  return <Button onClick={() => setCreateOpen(!createOpen)}>Trigger</Button>;
}
