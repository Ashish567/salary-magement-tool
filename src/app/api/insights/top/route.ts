import { NextRequest } from 'next/server';
import { InsightsService } from '@/services/insights.service';
import { ApiResponse } from '@/lib/api-response';

const insightsService = new InsightsService();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    const insights = await insightsService.getTopJobTitles(limit);
    return ApiResponse.success(insights);
  } catch (error: any) {
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
