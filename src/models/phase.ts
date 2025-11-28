// models/phase.ts
import { Schema, model, models } from "mongoose";

export type TaskPriority = "low" | "medium" | "high";

const TaskSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    dueDate: { type: Date, default: null },
  },
  { _id: false }
);

const PhaseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: { type: [TaskSchema], default: [] },
  },
  { timestamps: true }
);

export const PhaseModel = models.Phase || model("Phase", PhaseSchema);
