import { NextRequest } from 'next/server';
import { InsightsService } from '@/services/insights.service';
import { ApiResponse } from '@/lib/api-response';

const insightsService = new InsightsService();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country');
    const jobTitle = searchParams.get('jobTitle');

    if (!country || !jobTitle) {
      return ApiResponse.badRequest('Country and Job Title are required');
    }

    const insight = await insightsService.getJobTitleInsight({ country, jobTitle });
    
    if (!insight) {
      return ApiResponse.notFound('No insights found for the given criteria');
    }

    return ApiResponse.success(insight);
  } catch (error: any) {
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
