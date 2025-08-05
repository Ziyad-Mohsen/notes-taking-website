"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import ColorPicker from "../ui/ColorPicker";
import type { NewNote } from "@/types";
import { createNote } from "@/actions/actions";

export default function NewNote() {
  const [formData, setFormData] = useState<NewNote>({
    title: "New Note",
    body: "",
    color: null,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createNote(formData);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <PopoverTrigger asChild>
        <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer">
          <Plus />
          New Note
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align="start"
        className="w-80 bg-accent border-1 shadow-lg border-foreground p-5 rounded-2xl"
      >
        <form className="grid gap-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New note</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="col-span-2 h-8"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                className="col-span-2 h-8"
                value={formData.body}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <ColorPicker
                value={formData.color || undefined}
                onChange={(newColor) =>
                  setFormData((prev) => ({ ...prev, color: newColor }))
                }
              />
              <p>{formData.color ? formData.color : "#000000"}</p>
            </div>
            <Button className="cursor-pointer">Create</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
