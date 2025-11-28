"use client";

import { useIsDarkMode } from "@/hooks";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { Suspense, type PropsWithChildren } from "react"
import { dark } from "@clerk/themes";

type TClerkProviderProps = PropsWithChildren

export function ClerkProvider({ children }: TClerkProviderProps) {
    const isDarkMode = useIsDarkMode();

    return <Suspense> <OriginalClerkProvider appearance={isDarkMode ? { baseTheme: [dark] } : undefined}>{children}</OriginalClerkProvider>
    </Suspense>
}