import { Feature } from "@/types/landing.types";
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

/** Messages JSON file format
 * {
 *  "pages": {
 *    "landing": {
 *      "features": {
 *        items: {...}
 *      }
 *    }
 *  }
 * }
 */
export function getFeatures(t): Feature[] {
  return [
    {
      icon: Plus,
      title: t("items.quickNoteCreation.title"),
      description: t("items.quickNoteCreation.description"),
      iconBgColor: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: Search,
      title: t("items.powerfulSearch.title"),
      description: t("items.powerfulSearch.description"),
      iconBgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: FolderOpen,
      title: t("items.smartOrganization.title"),
      description: t("items.smartOrganization.description"),
      iconBgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
    },
    {
      icon: CheckSquare,
      title: t("items.builtInTodos.title"),
      description: t("items.builtInTodos.description"),
      iconBgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Palette,
      title: t("items.richTextEditor.title"),
      description: t("items.richTextEditor.description"),
      iconBgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Pin,
      title: t("items.pinFavorite.title"),
      description: t("items.pinFavorite.description"),
      iconBgColor: "bg-rose-500/10",
      iconColor: "text-rose-500",
    },
    {
      icon: Moon,
      title: t("items.darkMode.title"),
      description: t("items.darkMode.description"),
      iconBgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-500",
    },
    {
      icon: Trash2,
      title: t("items.smartTrash.title"),
      description: t("items.smartTrash.description"),
      iconBgColor: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      icon: Zap,
      title: t("items.keyboardShortcuts.title"),
      description: t("items.keyboardShortcuts.description"),
      iconBgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ];
}
