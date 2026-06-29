import { Outlet } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashBoardShell";

export default function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}