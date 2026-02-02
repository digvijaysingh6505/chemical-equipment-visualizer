
import type { EquipmentData, SummaryStatistics } from '../types';

export const parseAndAnalyzeCSV = (file: File): Promise<{ data: EquipmentData[]; summary: SummaryStatistics }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        if (rows.length <= 1) {
          throw new Error('CSV file is empty or contains only a header.');
        }
        
        const header = rows[0].split(',').map(h => h.trim());
        const requiredHeaders = ['Equipment Name', 'Type', 'Flowrate', 'Pressure', 'Temperature'];
        
        if (!requiredHeaders.every(h => header.includes(h))) {
            throw new Error(`Invalid CSV format. Missing one or more required headers: ${requiredHeaders.join(', ')}`);
        }

        const data: EquipmentData[] = [];
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(v => v.trim());
          const rowData: any = {};
          header.forEach((h, index) => {
            rowData[h] = values[index];
          });
          
          const flowrate = parseFloat(rowData.Flowrate);
          const pressure = parseFloat(rowData.Pressure);
          const temperature = parseFloat(rowData.Temperature);

          if (isNaN(flowrate) || isNaN(pressure) || isNaN(temperature)) {
              console.warn(`Skipping invalid row ${i+1}: Contains non-numeric values for measurements.`);
              continue;
          }

          data.push({
            'Equipment Name': rowData['Equipment Name'],
            Type: rowData.Type,
            Flowrate: flowrate,
            Pressure: pressure,
            Temperature: temperature,
          });
        }
        
        if (data.length === 0) {
            throw new Error("No valid data rows found in the CSV file.");
        }

        const totalCount = data.length;
        const totalFlowrate = data.reduce((sum, item) => sum + item.Flowrate, 0);
        const totalPressure = data.reduce((sum, item) => sum + item.Pressure, 0);
        const totalTemperature = data.reduce((sum, item) => sum + item.Temperature, 0);

        const typeCounts: { [key: string]: number } = data.reduce((acc, item) => {
          acc[item.Type] = (acc[item.Type] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });
        
        const typeDistribution = Object.entries(typeCounts).map(([name, count]) => ({ name, count }));

        const summary: SummaryStatistics = {
          totalCount,
          averageFlowrate: totalFlowrate / totalCount,
          averagePressure: totalPressure / totalCount,
          averageTemperature: totalTemperature / totalCount,
          typeDistribution,
        };

        resolve({ data, summary });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsText(file);
  });
};
