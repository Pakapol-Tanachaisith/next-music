import {
  Home,
  LucideIcon,
  FolderKanban,
  Heart,
  PlusCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Manage",
    href: "/manage",
    icon: FolderKanban,
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    label: "Upload",
    href: "/songs/upload",
    icon: PlusCircle,
  },
];
