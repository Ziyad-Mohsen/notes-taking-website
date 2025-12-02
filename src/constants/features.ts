import { Feature } from "@/types";
import {
  CheckSquare,
  FolderOpen,
  Moon,
  Palette,
  Pin,
  Plus,
  Search,
  Trash2,
  Zap,
} from "lucide-react";

export const features: Feature[] = [
  {
    icon: Plus,
    title: "Quick Note Creation",
    description:
      "Create notes instantly with auto-save. Never lose your thoughts again.",
    iconBgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find any note in seconds by searching titles, content, or tags.",
    iconBgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: FolderOpen,
    title: "Smart Organization",
    description:
      "Organize with folders, tags, and custom colors for visual clarity.",
    iconBgColor: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    icon: CheckSquare,
    title: "Built-in To-Dos",
    description:
      "Create checklists within notes to track tasks and stay productive.",
    iconBgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Palette,
    title: "Rich Text Editor",
    description:
      "Format your notes with bold, italic, headings, lists, and code blocks.",
    iconBgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Pin,
    title: "Pin & Favorite",
    description:
      "Keep important notes at the top and mark favorites for quick access.",
    iconBgColor: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Seamless dark/light theme switching for comfortable note-taking anytime.",
    iconBgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    icon: Trash2,
    title: "Smart Trash",
    description:
      "Deleted notes stay in trash for 30 days before permanent removal.",
    iconBgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    icon: Zap,
    title: "Keyboard Shortcuts",
    description:
      "Power-user shortcuts: Ctrl+N for new note, Ctrl+K for search, and more.",
    iconBgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
];
