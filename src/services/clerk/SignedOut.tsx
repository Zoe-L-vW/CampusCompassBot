import { PropsWithChildren, Suspense } from "react";
import { SignedOut as ClerkSignedOut } from "@clerk/nextjs";

type TSignedOutProps = PropsWithChildren;
export function SignedOut({ children }: TSignedOutProps) {
    return <Suspense>
        <ClerkSignedOut>{children}</ClerkSignedOut>
    </Suspense>
}