import { NavLink } from "react-router-dom";
import { navigation } from "@/config/navigation";

interface NavItemsProps {
  onNavigate?: () => void;
}

export default function NavItems({ onNavigate }: NavItemsProps) {
  return (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;

        const exactMatch =
          item.href === "/dashboard";
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={exactMatch}
            onClick={onNavigate}
            className={({ isActive }) =>
              `
              flex items-center gap-3
              rounded-lg px-3 py-2
              transition-colors
              ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }
            `
            }
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}