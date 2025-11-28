import { use } from "react";
import { DashboardContext } from "./context";

export function useDashboard() {
    const context = use(DashboardContext);

    if (!context) {
        throw new Error("useDashboard must be used within Dashboard!");
    }

    return context;
}