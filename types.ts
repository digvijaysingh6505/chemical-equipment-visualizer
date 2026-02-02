
export interface EquipmentData {
  'Equipment Name': string;
  Type: string;
  Flowrate: number;
  Pressure: number;
  Temperature: number;
}

export interface SummaryStatistics {
  totalCount: number;
  averageFlowrate: number;
  averagePressure: number;
  averageTemperature: number;
  typeDistribution: { name: string; count: number }[];
}
