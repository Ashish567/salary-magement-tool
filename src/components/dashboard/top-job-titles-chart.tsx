"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { JobTitleInsight } from "@/dto/insights.dto";

interface TopJobTitlesChartProps {
  data: JobTitleInsight[];
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export function TopJobTitlesChart({ data }: TopJobTitlesChartProps) {
  return (
    <Card className="col-span-4 shadow-lg shadow-primary/5 border-primary/10">
      <CardHeader>
        <CardTitle>Top Paying Job Titles</CardTitle>
        <CardDescription>Highest average salaries by position across the company.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', fontSize: 12 }} 
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis 
              dataKey="jobTitle" 
              type="category"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', fontSize: 12 }}
              width={150}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Average Salary"]}
            />
            <Bar dataKey="averageSalary" radius={[0, 4, 4, 0]} barSize={30}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
