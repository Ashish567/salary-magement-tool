"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CountryInsight } from "@/dto/insights.dto";

interface EmployeeDistributionChartProps {
  data: CountryInsight[];
}

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

export function EmployeeDistributionChart({ data }: EmployeeDistributionChartProps) {
  const chartData = data.map(item => ({
    name: item.country,
    value: item.employeeCount
  }));

  return (
    <Card className="col-span-4 lg:col-span-2 shadow-lg shadow-primary/5 border-primary/10">
      <CardHeader>
        <CardTitle>Employee Distribution</CardTitle>
        <CardDescription>Workforce concentration across different regions.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
