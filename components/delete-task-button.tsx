"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";

export default function DeleteTaskButton() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  return (
    <div>
      {dialogOpen && <Dialog />}
      <Button variant={"destructive"} onClick={handleOpenDialog}>
        Delete
      </Button>
    </div>
  );
}
