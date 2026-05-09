import { NextRequest } from 'next/server';
import { InsightsService } from '@/services/insights.service';
import { ApiResponse } from '@/lib/api-response';

const insightsService = new InsightsService();

export async function GET(req: NextRequest) {
  try {
    const summary = await insightsService.getSummary();
    return ApiResponse.success(summary);
  } catch (error: any) {
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
