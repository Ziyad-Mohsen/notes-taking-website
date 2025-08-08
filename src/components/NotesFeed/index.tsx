"use client";

import { Note } from "@/types";
import NewNote from "@/components/NewNote";
import NoteCard from "../NoteCard";
import { FileText } from "lucide-react";

interface NotesFeedProps {
  notes: Note[] | never[];
  user: { id: string };
}

export default function NotesFeed({ notes }: NotesFeedProps) {
  return (
    <div className="mt-30">
      <NewNote />
      {notes.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
          {notes.length &&
            notes.map((note: Note) => {
              return <NoteCard key={note.id} note={note} />;
            })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
          <FileText className="w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold">No notes found</h2>
          <p className="text-sm">Create your first note to get started!</p>
        </div>
      )}
    </div>
  );
}
