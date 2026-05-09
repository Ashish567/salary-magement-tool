-- CreateIndex
CREATE INDEX "Employee_createdAt_idx" ON "Employee"("createdAt");

-- CreateIndex
CREATE INDEX "Employee_salary_idx" ON "Employee"("salary");

-- CreateIndex
CREATE INDEX "Employee_country_jobTitle_idx" ON "Employee"("country", "jobTitle");
