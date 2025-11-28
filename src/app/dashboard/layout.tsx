import { PropsWithChildren } from "react";
import { AppSidebar } from "./_components";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import DashboardContextProvider from "./context";

type TDashboardLayoutProps = PropsWithChildren;
export default function DashboardLayout({ children }: TDashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <DashboardContextProvider>
          {children}
        </DashboardContextProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
