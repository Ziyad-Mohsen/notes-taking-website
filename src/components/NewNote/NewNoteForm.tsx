import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

export default async function NewNoteForm() {
  return (
    <form className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">New note</h4>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            defaultValue="New note"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="body">Body</Label>
          <Textarea id="body" defaultValue="300px" className="col-span-2 h-8" />
        </div>
        <Button className="cursor-pointer">Create</Button>
      </div>
    </form>
  );
}
