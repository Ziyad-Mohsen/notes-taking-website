export type Note = {
  id: string;
  title: string;
  body: string;
  color: string | null;
  created_at: string;
};

export type NewNote = {
  title: string;
  body: string;
  color: string | null;
};
