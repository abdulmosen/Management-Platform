

import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { mockEmployees } from '../../data/mockData.ts';
import StatusPill from '../ui/StatusPill';
import Button from '../ui/Button';

const Employees: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
       <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
         <h2 className="text-xl font-bold text-gray-800">متابعة شؤون الموظفين</h2>
         <Button>إضافة موظف جديد</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">اسم الموظف</th>
              <th scope="col" className="px-6 py-4 font-semibold">حالة الإقامة</th>
              <th scope="col" className="px-6 py-4 font-semibold">انتهاء الإقامة</th>
              <th scope="col" className="px-6 py-4 font-semibold">حالة التأمين</th>
              <th scope="col" className="px-6 py-4 font-semibold">انتهاء التأمين</th>
              <th scope="col" className="px-6 py-4 font-semibold">حالة العقد</th>
            </tr>
          </thead>
          <tbody>
            {mockEmployees.map((employee, index) => (
              <tr key={employee.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4">
                  <StatusPill status={employee.iqamaStatus} />
                </td>
                <td className="px-6 py-4">{employee.iqamaExpiry}</td>
                <td className="px-6 py-4">
                  <StatusPill status={employee.insuranceStatus} />
                </td>
                <td className="px-6 py-4">{employee.insuranceExpiry}</td>
                 <td className="px-6 py-4">
                  <StatusPill status={employee.contractStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;