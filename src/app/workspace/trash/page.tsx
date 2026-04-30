import { createClient } from "@/lib/supabase/server";
import { BrushCleaning } from "lucide-react";

export default async function Trash() {
  const supabase = await createClient();
  const { data: deletedNotes, error } = await supabase
    .from("notes")
    .select("*")
    .not("deleted_at", "is", null);

  if ((deletedNotes && !deletedNotes.length) || error)
    return (
      <section className="flex items-center justify-center flex-1 text-foreground">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary/20 text-primary w-20 h-20 rounded-full flex items-center justify-center">
            <BrushCleaning size={28} />
          </div>
          <div className="max-w-[400px]">
            <h2 className="text-xl font-semibold">Trash is Empty</h2>
            <p className="text-muted-foreground">
              Deleted notes will appear here.
            </p>
            <p className="text-muted-foreground">
              Items in the trash are permanently deleted after 30 days.
            </p>
          </div>
        </div>
      </section>
    );

  return <section className="p-5 bg-secondary flex-1">trash</section>;
}
