
import React from 'react';
import type { EquipmentData } from '../types';

interface EquipmentTableProps {
  data: EquipmentData[];
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ data }) => {
  const headers = Object.keys(data[0] || {});

  return (
    <div className="overflow-x-auto max-h-96">
      <table className="w-full text-sm text-left text-text-secondary">
        <thead className="text-xs text-text-primary uppercase bg-gray-700/50 sticky top-0">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-card border-b border-gray-700 hover:bg-gray-800/50">
              {headers.map((header) => (
                <td key={header} className="px-6 py-4">
                  {row[header as keyof EquipmentData]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
