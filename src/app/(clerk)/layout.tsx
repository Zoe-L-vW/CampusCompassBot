import { PropsWithChildren } from "react"

type TClerkLayoutProps = PropsWithChildren;

export default function ClerkLayout({ children }: TClerkLayoutProps) {
    return <div className="flex min-h-screen w-full items-center justify-center">
        <div>{children}</div>
    </div>
}