import { PrismaClient } from '@prisma/client';
import { generateEmployees } from '../src/utils/employee-generator';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');
  const startTime = Date.now();

  // 1. Clear existing data
  console.log('🗑️  Clearing existing employees...');
  await prisma.employee.deleteMany();

  // 2. Configuration
  const TOTAL_EMPLOYEES = 10000;
  const BATCH_SIZE = 1000;
  let totalInserted = 0;

  console.log(`🚀 Generating and inserting ${TOTAL_EMPLOYEES} employees in batches of ${BATCH_SIZE}...`);

  const allEmails = new Set<string>();

  // 3. Batch insertion
  for (let i = 0; i < TOTAL_EMPLOYEES; i += BATCH_SIZE) {
    const employees = [];
    while (employees.length < BATCH_SIZE) {
      const emp = generateEmployees(1)[0];
      if (!allEmails.has(emp.email)) {
        allEmails.add(emp.email);
        employees.push(emp);
      }
    }
    
    await prisma.employee.createMany({
      data: employees,
    });

    totalInserted += employees.length;
    console.log(`📦 Inserted batch ${i / BATCH_SIZE + 1} (${totalInserted}/${TOTAL_EMPLOYEES})`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Seeding completed successfully!`);
  console.log(`📊 Total inserted: ${totalInserted}`);
  console.log(`⏱️  Execution time: ${duration}s`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
