import MobileSidebar from "./MobileSidebar";
import ThemeToggle from "../theme/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="
        sticky top-0 z-50
        h-16
        border-b
        bg-background/80
        backdrop-blur
      "
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <MobileSidebar />
          </div>

          <h1 className="text-lg font-semibold tracking-tight">
            Learning Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:block">
            {user?.name}
          </span>

          <ThemeToggle />

          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}