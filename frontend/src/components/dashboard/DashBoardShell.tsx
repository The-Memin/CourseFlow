import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden relative h-screen">
        <Topbar />

        <main
          className="
          flex-1
          overflow-y-auto
          p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}