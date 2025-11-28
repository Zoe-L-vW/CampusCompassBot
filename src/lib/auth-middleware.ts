import { NextRequest } from "next/server";
import {
  withErrorHandler,
  ApiHandler,
  UnauthorizedError,
  ForbiddenError,
} from "./api-handler";

// User type (customize based on your auth system)
export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// Extend NextRequest with user property
declare global {
  interface NextRequest {
    user?: AuthUser;
  }
}

// Mock auth verification - replace with your actual auth logic
async function verifyAuthToken(token: string): Promise<AuthUser> {
  // Replace with your actual token verification logic
  // This is just a mock implementation
  if (token === "valid-token") {
    return { id: "user-1", email: "user@example.com", role: "user" };
  }
  throw new Error("Invalid token");
}

// Auth middleware
export function withAuth(
  handler: ApiHandler,
  requiredRole?: string
): ApiHandler {
  return withErrorHandler(async (req: NextRequest, context) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      throw new UnauthorizedError("Authentication token required");
    }

    try {
      const user = await verifyAuthToken(token);

      // Check role if required
      if (requiredRole && user.role !== requiredRole) {
        throw new ForbiddenError("Insufficient permissions");
      }

      // Attach user to request
      // req.user = user;
      return await handler(req, context);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedError(
          "Invalid authentication token",
          error.message
        );
      }
      throw new UnauthorizedError("Authentication failed");
    }
  });
}

// Optional: Role-based auth helpers
export const withUserAuth = (handler: ApiHandler) => withAuth(handler, "user");
export const withAdminAuth = (handler: ApiHandler) =>
  withAuth(handler, "admin");
