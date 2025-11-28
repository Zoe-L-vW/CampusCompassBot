import { connectDB } from "./mongodb";

export async function withDBConnection<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    await connectDB();
    return await operation();
  } catch (error) {
    console.error("Database operation failed:", error);
    throw error;
  }
}
