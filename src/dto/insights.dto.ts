export interface CountryInsight {
  country: string;
  employeeCount: number;
  minimumSalary: number;
  maximumSalary: number;
  averageSalary: number;
}

export interface JobTitleInsight {
  country: string;
  jobTitle: string;
  averageSalary: number;
  employeeCount: number;
}

export interface JobTitleInsightQuery {
  country?: string;
  jobTitle?: string;
}
