import { InsightsRepository } from '@/repositories/insights.repository';
import { JobTitleInsightQuery } from '@/dto/insights.dto';

export class InsightsService {
  private repository = new InsightsRepository();

  async getCountryInsights() {
    return await this.repository.getCountryInsights();
  }

  async getJobTitleInsight(query: JobTitleInsightQuery) {
    if (!query.country || !query.jobTitle) {
      throw new Error('Country and Job Title are required');
    }

    return await this.repository.getJobTitleInsight(query.country, query.jobTitle);
  }
}
