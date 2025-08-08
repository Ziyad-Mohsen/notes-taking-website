"use server";

import { NewNote } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect(`/error?message=${error.message}`);
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(`/error?message=${error}`);
  }

  revalidatePath("/");
}

export async function getNotes() {
  const supabase = await createClient();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  return notes;
}

export async function deleteNote(noteId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  revalidatePath("/");
}

export async function updateNote(updatedNote: NewNote, noteId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notes")
    .update(updatedNote)
    .eq("id", noteId);

  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  revalidatePath("/");
}

export async function createNote(newNote: NewNote) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login`);
  }

  const { error } = await supabase
    .from("notes")
    .insert({ ...newNote, user_id: user.id });

  if (error) {
    redirect(`/error?${error.message}`);
  }

  revalidatePath("/");
}
