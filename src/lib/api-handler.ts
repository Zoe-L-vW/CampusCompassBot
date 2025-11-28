import { NextRequest, NextResponse } from "next/server";

// Types for route parameters
export type RouteParams = Record<string, string> | undefined;
export type AppRouteContext = { params?: RouteParams };

// Base handler type
export type ApiHandler = (
  req: NextRequest,
  context: AppRouteContext
) => Promise<NextResponse>;

// Custom error classes
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized", details?: unknown) {
    super(401, message, details);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden", details?: unknown) {
    super(403, message, details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found", details?: unknown) {
    super(404, message, details);
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal server error", details?: unknown) {
    super(500, message, details);
    this.name = "InternalServerError";
  }
}

// Main error handler
export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context: AppRouteContext) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            message: error.message,
            ...(error.details ? { details: error.details } : {}),
          },
          { status: error.statusCode }
        );
      }

      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
