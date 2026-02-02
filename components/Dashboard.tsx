import React from 'react';
import type { EquipmentData, SummaryStatistics } from '../types';
import StatCard from './StatCard';
import EquipmentTable from './EquipmentTable';
import TypeDistributionChart from './TypeDistributionChart';
import ParameterChart from './ParameterChart';

interface DashboardProps {
  data: EquipmentData[];
  summary: SummaryStatistics;
  fileName: string;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  data,
  summary,
  fileName,
  onReset
}) => {

  // Debug (you can remove later)
  console.log("SUMMARY:", summary);

  return (
    <div className="space-y-8 min-h-screen">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-card rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-accent">Analysis Dashboard</h2>
          <p className="text-text-secondary">
            Results for:{" "}
            <span className="font-semibold text-text-primary">
              {fileName}
            </span>
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
        >
          Upload Another File
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Equipment"
          value={summary.totalCount.toLocaleString()}
        />
        <StatCard
          title="Avg. Flowrate"
          value={summary.averageFlowrate.toFixed(2)}
          unit="units/s"
        />
        <StatCard
          title="Avg. Pressure"
          value={summary.averagePressure.toFixed(2)}
          unit="kPa"
        />
        <StatCard
          title="Avg. Temperature"
          value={summary.averageTemperature.toFixed(2)}
          unit="°C"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">
            Equipment Type Distribution
          </h3>
          <TypeDistributionChart data={summary.typeDistribution} />
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">
            Average Parameter Values
          </h3>
          <ParameterChart summary={summary} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">
          Raw Equipment Data
        </h3>
        <EquipmentTable data={data} />
      </div>

    </div>
  );
};

export default Dashboard;
