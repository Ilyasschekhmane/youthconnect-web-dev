import { z } from 'zod';
import { withApiMiddleware } from '@/lib/api/middleware';
import { createApiErrorResponse, createApiResponse, parseJsonBody } from '@/lib/api/validation';

const createApplicationSchema = z.object({
  applicantId: z.string().uuid(),
  programId: z.string().uuid(),
  status: z.enum(['submitted', 'reviewed', 'approved', 'rejected']).default('submitted'),
});

export async function POST(request: Request) {
  return withApiMiddleware(request, async () => {
    const parsed = await parseJsonBody(request, createApplicationSchema);

    if (!parsed.success) {
      return createApiErrorResponse(parsed.error);
    }

    return createApiResponse(
      {
        id: 'application_123',
        ...parsed.data,
        submittedAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  });
}

export async function GET(request: Request) {
  return withApiMiddleware(request, async () => {
    return createApiResponse({
      items: [
        {
          id: 'application_123',
          applicantId: 'user_123',
          programId: 'program_123',
          status: 'submitted',
        },
      ],
    });
  });
}
