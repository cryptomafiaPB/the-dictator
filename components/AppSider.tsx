import { Building2, Home, Inbox, MicVocal, Palette } from "lucide-react";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineStyle } from "react-icons/md";
import { LuLandPlot } from "react-icons/lu";
import { CiCoffeeCup } from "react-icons/ci";
import { ImBullhorn } from "react-icons/im";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "News",
    url: "#",
    icon: Home,
  },
  {
    title: "World",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Bussiness",
    url: "#",
    icon: Building2,
  },
  {
    title: "Art",
    url: "#",
    icon: Palette,
  },
  {
    title: "Lifestyle",
    url: "#",
    icon: MdOutlineStyle,
  },
  {
    title: "Sport",
    url: "#",
    icon: LuLandPlot,
  },
  {
    title: "Opinion",
    url: "#",
    icon: MicVocal,
  },
  {
    title: "Culture",
    url: "#",
    icon: CiCoffeeCup,
  },
  {
    title: "Politic",
    url: "#",
    icon: ImBullhorn,
  },
  {
    title: "Advertisement",
    url: "#",
    icon: RiAdvertisementLine,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[url('/noise-dark.svg')] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
