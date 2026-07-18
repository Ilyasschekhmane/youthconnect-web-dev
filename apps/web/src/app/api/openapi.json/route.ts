import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    openapi: '3.1.0',
    info: {
      title: 'YouthConnect API',
      version: '1.0.0',
      description: 'REST API for the YouthConnect GovTech platform.',
    },
    paths: {
      '/api/organizations': {
        get: { summary: 'List organizations' },
        post: { summary: 'Create an organization' },
      },
      '/api/programs': {
        get: { summary: 'List programs' },
        post: { summary: 'Create a program' },
      },
      '/api/applications': {
        get: { summary: 'List applications' },
        post: { summary: 'Create an application' },
      },
    },
  });
}
