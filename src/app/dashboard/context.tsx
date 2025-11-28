"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { TPhase, TPhases, TTask, TTasks } from "./types";
import { defaultPhases } from "./data";

type TCalculatePhaseResponse = {
    progress: number;
    totalTasks: number;
    totalCompletedTasks: number;
    totalIncompletedTasks: number;
    incompletedTasks: TTasks
}
type TDashboardContext = {
    phases: TPhases;
    handleTaskClick: (phase: TPhase, task: TTask) => void;
    calculatePhase: (phase: TPhase) => TCalculatePhaseResponse;
}
type TDashboardContextProviderProps = PropsWithChildren;

export const DashboardContext = createContext<TDashboardContext | null>(null);

export default function DashboardContextProvider({ children }: TDashboardContextProviderProps) {
    const [phases, setPhases] = useState(defaultPhases);

    const handleTaskClick = (phase: TPhase, task: TTask) => {
        setPhases((prevPhases) =>
            prevPhases.map((currentPhase) => {
                if (currentPhase.id !== phase.id) return currentPhase;

                const updatedTasks = currentPhase.tasks.map((currentTask) =>
                    currentTask.id === task.id
                        ? { ...currentTask, completed: !currentTask.completed }
                        : currentTask
                );

                return { ...currentPhase, tasks: updatedTasks };
            })
        );
    };

    const calculatePhase = (phase: TPhase): TCalculatePhaseResponse => {
        const tasks = phase.tasks;
        const totalTasks = tasks.length;
        const totalCompletedTasks = tasks.filter(task => task.completed).length;
        const incompletedTasks = tasks.filter(task => !task.completed);
        const progress = Math.ceil((totalCompletedTasks / totalTasks) * 100);

        return {
            progress,
            totalTasks,
            totalCompletedTasks,
            incompletedTasks,
            totalIncompletedTasks: totalTasks - totalCompletedTasks
        };
    }


    return <DashboardContext.Provider value={{ phases, handleTaskClick, calculatePhase }}>{children}</DashboardContext.Provider>
}