// lib/validation/phase.ts
import { z } from "zod";

export const taskSchema = z.object({
  _id: z.string(),
  label: z.string(),
  description: z.string(),
  completed: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().nullable(),
});

export const phaseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema).default([]),
});

export type TTask = z.infer<typeof taskSchema>;
export type TPhase = z.infer<typeof phaseSchema>;
