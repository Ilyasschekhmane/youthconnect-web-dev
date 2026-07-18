import { z } from 'zod';
import { withApiMiddleware } from '@/lib/api/middleware';
import { createApiErrorResponse, createApiResponse, parseJsonBody } from '@/lib/api/validation';

const createProgramSchema = z.object({
  name: z.string().min(2),
  organizationId: z.string().uuid().optional(),
  cityId: z.string().uuid().optional(),
  status: z.enum(['draft', 'active', 'closed']).default('draft'),
});

export async function POST(request: Request) {
  return withApiMiddleware(request, async () => {
    const parsed = await parseJsonBody(request, createProgramSchema);

    if (!parsed.success) {
      return createApiErrorResponse(parsed.error);
    }

    return createApiResponse(
      {
        id: 'program_123',
        ...parsed.data,
        createdAt: new Date().toISOString(),
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
          id: 'program_123',
          name: 'Youth Employment Bootcamp',
          organizationId: 'org_123',
          cityId: 'city_123',
          status: 'active',
        },
      ],
    });
  });
}
