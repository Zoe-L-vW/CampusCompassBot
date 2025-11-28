"use client";
import { ThemeModeToggle } from "@/components";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui";
import { useIsDarkMode, useIsDesktop, useIsMobile } from "@/hooks";
import { Sidebar } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const navbarLinks = [
  {
    key: "faqs",
    href: "faqs",
    label: "FAQs",
  },
  {
    key: "about-us",
    href: "about-us",
    label: "About Us",
  },
  {
    key: "contact-us",
    href: "contact-us",
    label: "Contact Us",
  },
].map((item, idx) => ({ ...item, id: idx }));

export function Navbar() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(-1);
  const isDark = useIsDarkMode();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  if (isMobile) {
    return (
      <Drawer direction="left">
        <DrawerTrigger>
          <Sidebar />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Campus Compass 🧭</DrawerTitle>
          </DrawerHeader>
          <ul className="p-4">
            {navbarLinks.map((navbarLink, idx) => {
              const isActive = activeLinkIdx === idx;

              return (
                <li
                  className={`py-2 ${isActive
                    ? "px-3 rounded bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => setActiveLinkIdx(idx)}
                  key={navbarLink.key}
                >
                  <DrawerClose>
                    <a href={`#${navbarLink.href}`}>{navbarLink.label}</a>
                  </DrawerClose>
                </li>
              );
            })}
          </ul>
          <DrawerFooter>
            <div className="px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeModeToggle />
              </div>
            </div>
            <Link href={"/dashboard"}>
              <Button className="w-full">Dashboard</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <nav>
      <ul className={`flex items-center ${isDesktop ? "gap-6" : "gap-3"}`}>
        {navbarLinks.map((navbarLink, idx) => {
          const isActive = activeLinkIdx === idx;
          return (
            <li
              className="relative px-3 py-1.5"
              key={navbarLink.key}
              onClick={() => setActiveLinkIdx(idx)}
            >
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className={`absolute inset-0 bg-primary`}
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.6, type: "spring" }}
                />
              )}
              <a
                href={`#${navbarLink.href}`}
                className={`dark:mix-blend-exclusion relative z-1 ${!isDark && isActive ? "text-primary-foreground" : ""
                  } ${isActive ? "" : "hover:text-foreground/50 transition-colors"
                  }`}
              >
                {navbarLink.label}
              </a>
            </li>
          );
        })}
        <ThemeModeToggle />
      </ul>
    </nav>
  );
}
