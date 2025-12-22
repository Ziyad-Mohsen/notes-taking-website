import { Database } from "./supabase.types";

// Note
export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type NoteInsert = Database["public"]["Tables"]["notes"]["Insert"];
export type NoteUpdate = Database["public"]["Tables"]["notes"]["Update"];

// Note Tags
export type NoteTag = Database["public"]["Tables"]["note_tags"]["Row"];
export type NoteTagInsert = Database["public"]["Tables"]["note_tags"]["Row"];
export type NoteTagUpdate = Database["public"]["Tables"]["note_tags"]["Row"];

// Tags
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
export type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];
