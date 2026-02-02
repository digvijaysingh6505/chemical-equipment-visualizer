
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { SummaryStatistics } from '../types';

interface ParameterChartProps {
  summary: SummaryStatistics;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

const ParameterChart: React.FC<ParameterChartProps> = ({ summary }) => {
  const chartData = [
    { name: 'Flowrate', value: Number(summary.averageFlowrate.toFixed(2)) },
    { name: 'Pressure', value: Number(summary.averagePressure.toFixed(2)) },
    { name: 'Temperature', value: Number(summary.averageTemperature.toFixed(2)) },
  ];

  return (
    <div
      style={{
        width: '600px',
        height: '350px',
        margin: '20px auto',
        background: '#ffffff',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="value" name="Average Value">
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParameterChart;
