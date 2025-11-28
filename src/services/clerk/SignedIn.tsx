import { PropsWithChildren, Suspense } from "react";
import { SignedIn as ClerkSignedIn } from "@clerk/nextjs";

type TSignedInProps = PropsWithChildren;
export function SignedIn({ children }: TSignedInProps) {
    return <Suspense>
        <ClerkSignedIn>{children}</ClerkSignedIn>
    </Suspense>
}