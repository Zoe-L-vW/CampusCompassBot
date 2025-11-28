import { NextRequest, NextResponse } from "next/server";
import {
  withErrorHandler,
  ApiHandler,
  AppRouteContext,
  ValidationError,
} from "./api-handler";
import { withDBConnection } from "./db-utils";
import { withAuth, AuthUser } from "./auth-middleware";

// JSON body type
export type JsonBody = Record<string, unknown> | unknown[] | null;

// Extend NextRequest with typed JSON body and user
declare global {
  interface NextRequest {
    jsonBody?: JsonBody;
    user?: AuthUser;
  }
}

// Base handler types
export type RouteHandler = ApiHandler;
export type JsonRouteHandler<T = JsonBody> = (
  req: NextRequest & { jsonBody: T },
  context: AppRouteContext
) => Promise<NextResponse>;

// Create basic route handler with DB connection
export function createRouteHandler(handler: RouteHandler): RouteHandler {
  return withErrorHandler(
    async (req: NextRequest, context: AppRouteContext) => {
      return await withDBConnection(() => handler(req, context));
    }
  );
}

// Create JSON route handler with automatic parsing
export function createJsonRouteHandler<T = JsonBody>(
  handler: JsonRouteHandler<T>
): RouteHandler {
  return withErrorHandler(
    async (req: NextRequest, context: AppRouteContext) => {
      // Auto-parse JSON for methods that typically have a body
      if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        try {
          const jsonBody = (await req.json()) as T;
          const enhancedReq = Object.assign(req, { jsonBody });
          return await withDBConnection(() => handler(enhancedReq, context));
        } catch (error) {
          throw new ValidationError("Invalid JSON payload", error);
        }
      }

      return await withDBConnection(() =>
        handler(req as NextRequest & { jsonBody: T }, context)
      );
    }
  );
}

// Create authenticated route handler
export function createAuthRouteHandler(
  handler: RouteHandler,
  requiredRole?: string
): RouteHandler {
  const baseHandler = createRouteHandler(handler);
  return withAuth(baseHandler, requiredRole);
}

// Create authenticated JSON route handler
export function createAuthJsonRouteHandler<T = JsonBody>(
  handler: JsonRouteHandler<T>,
  requiredRole?: string
): RouteHandler {
  const baseHandler = createJsonRouteHandler<T>(handler);
  return withAuth(baseHandler, requiredRole);
}

// Helper for specific HTTP methods
export const handlers = {
  GET: createRouteHandler,
  POST: createJsonRouteHandler,
  PUT: createJsonRouteHandler,
  PATCH: createJsonRouteHandler,
  DELETE: createJsonRouteHandler,
  auth: {
    GET: (handler: RouteHandler, role?: string) =>
      createAuthRouteHandler(handler, role),
    POST: <T = JsonBody>(handler: JsonRouteHandler<T>, role?: string) =>
      createAuthJsonRouteHandler<T>(handler, role),
  },
};
