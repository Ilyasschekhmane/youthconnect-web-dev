import { z } from 'zod';
import { withApiMiddleware } from '@/lib/api/middleware';
import { createApiErrorResponse, createApiError, createApiResponse, parseJsonBody } from '@/lib/api/validation';

const createOrganizationSchema = z.object({
  name: z.string().min(2),
  sector: z.string().min(2).optional(),
  cityId: z.string().uuid().optional(),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  return withApiMiddleware(request, async () => {
    const parsed = await parseJsonBody(request, createOrganizationSchema);

    if (!parsed.success) {
      return createApiErrorResponse(parsed.error);
    }

    const payload = parsed.data;

    return createApiResponse(
      {
        id: 'org_123',
        ...payload,
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
          id: 'org_123',
          name: 'YouthBridge NGO',
          sector: 'Education',
          cityId: 'city_123',
          description: 'Community-led youth services',
        },
      ],
    });
  });
}
