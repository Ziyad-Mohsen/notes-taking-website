"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Pen, Trash, X } from "lucide-react";
import { isEqual } from "lodash";
import ColorPicker from "../ui/ColorPicker";
import type { Note } from "@/types";
import { deleteNote, updateNote } from "@/actions/actions";

interface NoteProps {
  note: Note;
}

export default function NoteCard({ note }: NoteProps) {
  const initialNote = useMemo(() => {
    return note;
  }, [note]);
  const [newNote, setNewNote] = useState(initialNote);
  const [editing, setEditing] = useState<boolean>(false);

  const handleEditButtonClick = () => {
    if (editing) {
      setNewNote(initialNote); // reset edit
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleEditNote = async () => {
    await updateNote(newNote, note.id);
    setEditing(false);
  };

  const handleDeleteNote = async () => {
    await deleteNote(note.id);
  };

  return (
    <div
      className="mt-5 p-5 flex flex-col gap-2 rounded-lg"
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
            className="text-[50px]"
          />
        ) : (
          <h2 className="text-card-foreground text-2xl font-semibold">
            {note.title}
          </h2>
        )}
        <div className="flex items-center gap-1">
          {editing && (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer hover:text-red-500"
            >
              <ColorPicker
                value={newNote.color}
                onChange={(newColor) =>
                  setNewNote((prev) => ({ ...prev, color: newColor }))
                }
              />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:text-blue-500"
            onClick={handleEditButtonClick}
          >
            {editing ? <X /> : <Pen />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:text-red-500"
            onClick={handleDeleteNote}
          >
            <Trash />
          </Button>
        </div>
      </div>
      {editing ? (
        <Textarea
          value={newNote.body}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, body: e.target.value }))
          }
        />
      ) : (
        <p className="text-base text-card-foreground/50">{note.body}</p>
      )}
      {editing && !isEqual(newNote, initialNote) && (
        <Button className="cursor-pointer" onClick={handleEditNote}>
          Save
        </Button>
      )}
    </div>
  );
}
