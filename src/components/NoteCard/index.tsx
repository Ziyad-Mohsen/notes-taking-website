"use client";

import { useMemo, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Pen, Trash, X, Loader2 } from "lucide-react";
import { isEqual } from "lodash";
import ColorPicker from "../ui/ColorPicker";
import type { Note } from "@/types";
import { deleteNote, updateNote } from "@/actions/actions";
import { toast } from "sonner";

interface NoteProps {
  note: Note;
}

export default function NoteCard({ note }: NoteProps) {
  const initialNote = useMemo(() => note, [note]);
  const [newNote, setNewNote] = useState(initialNote);
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
    if (editing) setNewNote(initialNote);
  };

  const handleEditNote = () => {
    startTransition(async () => {
      try {
        setEditing(false);
        await updateNote(newNote, note.id);
        toast.success("Note updated");
      } catch (err) {
        toast.error("Failed to update note");
        setNewNote(initialNote);
      }
    });
  };

  const handleDeleteNote = async () => {
    setIsDeleting(true);
    try {
      await deleteNote(note.id);
      toast.success("Note deleted");
    } catch (err) {
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="mt-5 p-5 flex flex-col gap-2 rounded-lg transition-shadow hover:shadow"
      style={{
        backgroundColor: newNote.color ? `${newNote.color}70` : "var(--accent)",
      }}
    >
      <div className="flex justify-between items-center gap-2">
        {editing ? (
          <Input
            value={newNote.title}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, title: e.target.value }))
            }
            disabled={isPending || isDeleting}
            className="text-[24px] font-medium"
          />
        ) : (
          <h2 className="text-card-foreground text-2xl font-semibold">
            {note.title}
          </h2>
        )}
        <div className="flex items-center gap-1">
          {editing && (
            <ColorPicker
              value={newNote.color}
              onChange={(color) => setNewNote((prev) => ({ ...prev, color }))}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditToggle}
            className="hover:text-blue-500 cursor-pointer"
            disabled={isPending}
          >
            {editing ? <X /> : <Pen />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteNote}
            className="hover:text-red-500 cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />}
          </Button>
        </div>
      </div>

      {editing ? (
        <Textarea
          value={newNote.body}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, body: e.target.value }))
          }
          className="resize-none"
          disabled={isPending || isDeleting}
        />
      ) : (
        <p className="text-base text-card-foreground/60 whitespace-pre-line">
          {note.body}
        </p>
      )}

      {editing && !isEqual(newNote, initialNote) && (
        <Button
          className="mt-2 cursor-pointer"
          onClick={handleEditNote}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      )}
    </div>
  );
}
