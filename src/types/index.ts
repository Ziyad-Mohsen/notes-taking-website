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

export type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
};
