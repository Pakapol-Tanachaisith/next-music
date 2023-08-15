import {
  Home,
  LucideIcon,
  FolderKanban,
  Heart,
  PlusCircle,
  ListMusic,
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
    label: "Playlists",
    href: "/playlists",
    icon: ListMusic,
  },
  {
    label: "Upload",
    href: "/songs/upload",
    icon: PlusCircle,
  },
];
