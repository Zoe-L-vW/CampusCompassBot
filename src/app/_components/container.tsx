import { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TContainerProps = PropsWithChildren & ComponentProps<"main">;

export function Container({ children, className = "", ...props }: TContainerProps) {
    const mergedClassName = twMerge(`mx-auto w-[calc(100%-2rem)] sm:w-full max-w-[1024px]`, className);

    return <main className={mergedClassName} {...props}>
        {children}
    </main>
}