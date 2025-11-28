import { LucideIcon } from "lucide-react";

export type TTaskPriority = "high" | "medium" | "low";
export type TTask = {
    id: string;
    label: string;
    description: string;
    completed: boolean;
    priority: TTaskPriority;
    dueDate: string | null;
}
export type TTasks = Array<TTask>;
export type TPhase = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tasks: TTasks;
}
export type TPhases = Array<TPhase>;