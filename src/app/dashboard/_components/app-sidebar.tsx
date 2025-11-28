"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { NavMain } from "./nav-main";
import { DashboardIcon, PathwayIcon, TodosIcon } from "@/components";
import { MessageSquareText } from "lucide-react"; // Import chat icon
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Pathway",
      url: "/dashboard/pathway",
      icon: PathwayIcon,
    },
    {
      title: "Todos",
      url: "/dashboard/todos",
      icon: TodosIcon,
    },
    {
      title: "Chat Assistant", // Added Chat link
      url: "/dashboard/chat",
      icon: MessageSquareText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <span className="text-base sm:text-xl font-semibold">Campus Compass 🧭</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}