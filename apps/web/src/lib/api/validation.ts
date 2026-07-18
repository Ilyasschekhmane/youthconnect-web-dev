import { z } from 'zod';

export type ApiErrorPayload = {
  success: false;
  error: {
    code: string;
    message: string;
    status: number;
    details?: unknown;
  };
};

export type ApiSuccessPayload<T> = {
  success: true;
  data: T;
};

export type ApiResponse<T> = ApiSuccessPayload<T> | ApiErrorPayload;

export function createApiError(message: string, status = 500, code = 'INTERNAL_SERVER_ERROR') {
  return {
    status,
    code,
    message,
  };
}

export async function parseJsonBody<T extends z.ZodTypeAny>(request: Request, schema: T) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return {
        success: false as const,
        error: createApiError('Invalid request body', 400, 'VALIDATION_ERROR'),
      };
    }

    return {
      success: true as const,
      data: parsed.data as z.infer<T>,
    };
  } catch {
    return {
      success: false as const,
      error: createApiError('Invalid JSON payload', 400, 'VALIDATION_ERROR'),
    };
  }
}

export function createApiResponse<T>(data: T, init?: ResponseInit): Response {
  return Response.json({ success: true, data }, init);
}

export function createApiErrorResponse(error: ReturnType<typeof createApiError>, init?: ResponseInit): Response {
  return Response.json(
    {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        status: error.status,
      },
    },
    {
      status: error.status,
      ...init,
    },
  );
}
