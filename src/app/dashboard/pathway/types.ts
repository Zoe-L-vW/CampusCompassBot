import { JSX } from "react";

export type TCategory = "Before Arrival" | "Settling In" | "Upon Arrival"

export type TTodo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: TCategory;
    dueDate: string | null;
}

export type TTodos = Array<TTodo>;

export type TPhase = {
    id: string;
    title: string;
    icon: JSX.Element;
    description: string;
    todos: TTodos;
}

export type TPhases = Array<TPhase>;