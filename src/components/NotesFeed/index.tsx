"use client";

import { Note } from "@/types";
import NewNote from "@/components/NewNote";
import NoteCard from "../NoteCard";

interface NotesFeedProps {
  notes: Note[] | never[];
  user: { id: string };
}

export default function NotesFeed({ notes }: NotesFeedProps) {
  return (
    <div className="mt-30">
      <NewNote />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        {notes &&
          notes.map((note: Note) => {
            return <NoteCard key={note.id} note={note} />;
          })}
      </div>
    </div>
  );
}
