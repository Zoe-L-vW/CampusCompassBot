import { Button } from "@/components/ui";
import { SignUpButton as ClerkSignUpButton, SignInButton as ClerkSignInButton, SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import { type ComponentProps } from "react";

type TSignUpButtonProps = ComponentProps<typeof ClerkSignUpButton>
export function SignUpButton({ children = <Button>Sign Up</Button>, ...props }: TSignUpButtonProps) {
    return <ClerkSignUpButton {...props}>{children}</ClerkSignUpButton>
}

type TSignInButtonProps = ComponentProps<typeof ClerkSignInButton>
export function SignInButton({ children = <Button>Sign In</Button>, ...props }: TSignInButtonProps) {
    return <ClerkSignInButton {...props}>{children}</ClerkSignInButton>
}

type TSignOutButtonProps = ComponentProps<typeof ClerkSignOutButton>
export function SignOutButton({ children = <Button>Sign Out</Button>, ...props }: TSignOutButtonProps) {
    return <ClerkSignOutButton {...props}>{children}</ClerkSignOutButton>
}