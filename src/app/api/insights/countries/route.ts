import { NextRequest } from 'next/server';
import { InsightsService } from '@/services/insights.service';
import { ApiResponse } from '@/lib/api-response';

const insightsService = new InsightsService();

export async function GET(req: NextRequest) {
  try {
    const insights = await insightsService.getCountryInsights();
    return ApiResponse.success(insights);
  } catch (error: any) {
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
