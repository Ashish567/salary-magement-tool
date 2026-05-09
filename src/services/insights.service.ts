import { InsightsRepository } from '@/repositories/insights.repository';
import { JobTitleInsightQuery, jobTitleInsightQuerySchema } from '@/dto/insights.dto';

export class InsightsService {
  private repository = new InsightsRepository();

  async getCountryInsights() {
    return await this.repository.getCountryInsights();
  }

  async getJobTitleInsight(query: any) {
    const validation = jobTitleInsightQuerySchema.safeParse(query);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    return await this.repository.getJobTitleInsight(validation.data.country, validation.data.jobTitle);
  }

  async getSummary() {
    return await this.repository.getSummary();
  }
}
