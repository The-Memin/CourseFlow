import {
  Home,
  BookOpen,
  PlusCircle,
  User
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    label: "New Course",
    href: "/dashboard/new-course",
    icon: PlusCircle,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];