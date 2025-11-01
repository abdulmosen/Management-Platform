

import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { mockSubscriptions, mockExpenses } from '../../data/mockData.ts';
import StatusPill from '../ui/StatusPill';

const Financials: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-gray-800">متابعة الاشتراكات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">اسم الاشتراك</th>
                <th scope="col" className="px-6 py-4 font-semibold">المبلغ السنوي (ريال)</th>
                <th scope="col" className="px-6 py-4 font-semibold">تاريخ التجديد</th>
                <th scope="col" className="px-6 py-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map((sub, index) => (
                <tr key={sub.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{sub.name}</td>
                  <td className="px-6 py-4">{sub.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{sub.renewalDate}</td>
                  <td className="px-6 py-4">
                    <StatusPill status={sub.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-gray-800">المصاريف التشغيلية الأخيرة</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">البند</th>
                <th scope="col" className="px-6 py-4 font-semibold">الفئة</th>
                <th scope="col" className="px-6 py-4 font-semibold">المبلغ (ريال)</th>
                <th scope="col" className="px-6 py-4 font-semibold">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {mockExpenses.map((expense, index) => (
                <tr key={expense.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{expense.item}</td>
                  <td className="px-6 py-4">{expense.category}</td>
                  <td className="px-6 py-4">{expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;