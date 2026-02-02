
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border-l-4 border-secondary transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-sm font-medium text-text-secondary uppercase">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-text-primary">
        {value} <span className="text-lg font-normal text-accent">{unit}</span>
      </p>
    </div>
  );
};

export default StatCard;
