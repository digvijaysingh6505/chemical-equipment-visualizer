
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface TypeDistributionChartProps {
  data: { name: string; count: number }[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#f59e0b'];

const TypeDistributionChart: React.FC<TypeDistributionChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
        <BarChart
            data={data}
            margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" />
            <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#f9fafb' }}
            />
            <Legend wrapperStyle={{ color: '#d1d5db' }} />
            <Bar dataKey="count" name="Count" fill="#3b82f6">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default TypeDistributionChart;
