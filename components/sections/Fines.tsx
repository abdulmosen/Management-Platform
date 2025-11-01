

import React, { useState, useCallback } from 'react';
// FIX: Add .ts extension to file paths to resolve module errors.
import { mockFines } from '../../data/mockData.ts';
import { Fine, Status } from '../../types.ts';
import StatusPill from '../ui/StatusPill';
import Button from '../ui/Button';
import { analyzeFinesWithGemini } from '../../services/geminiService';
// FIX: Add .tsx extension to file path to resolve module error.
import { BrainCircuit, Loader } from '../icons/Icons.tsx';

const Fines: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnalyzeFines = useCallback(async () => {
    setIsLoading(true);
    setAnalysis('');
    const unpaidFines = mockFines.filter(f => f.status === Status.Unpaid);
    const result = await analyzeFinesWithGemini(unpaidFines);
    setAnalysis(result);
    setIsLoading(false);
  }, []);
  
  // Helper to render markdown-like text
  const renderAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-gray-800">{line.substring(4)}</h3>;
      if (line.startsWith('**')) return <p key={index} className="font-bold mt-2 text-gray-700">{line.replace(/\*\*/g, '')}</p>;
      if (line.startsWith('* ')) return <li key={index} className="ms-6 list-disc">{line.substring(2)}</li>;
       if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) return <li key={index} className="ms-6 list-decimal">{line.substring(3)}</li>;
      return <p key={index} className="my-1 text-gray-600">{line}</p>;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-bold text-gray-800">سجل الغرامات والمخالفات</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">الجهة</th>
                  <th scope="col" className="px-6 py-4 font-semibold">الوصف</th>
                  <th scope="col" className="px-6 py-4 font-semibold">المبلغ (ريال)</th>
                  <th scope="col" className="px-6 py-4 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {mockFines.map((fine, index) => (
                  <tr key={fine.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{fine.authority}</td>
                    <td className="px-6 py-4">{fine.description}</td>
                    <td className="px-6 py-4">{fine.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <StatusPill status={fine.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <div className="flex items-center mb-4">
            <BrainCircuit className="w-6 h-6 text-[var(--color-primary)] ml-3" />
            <h3 className="text-lg font-bold text-gray-800">المساعد الذكي</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            احصل على تحليل للأسباب الجذرية لمخالفاتك غير المدفوعة وتوصيات مخصصة لتجنبها مستقبلًا باستخدام الذكاء الاصطناعي.
          </p>
          <Button onClick={handleAnalyzeFines} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader className="animate-spin w-5 h-5 ml-2" />
                جاري التحليل...
              </>
            ) : 'تحليل المخالفات'}
          </Button>

          {isLoading && (
             <div className="mt-6 text-center text-gray-500">
                <p>يقوم الذكاء الاصطناعي بتحليل بياناتك...</p>
             </div>
          )}

          {analysis && !isLoading && (
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <h4 className="font-bold text-md mb-2 text-gray-800">نتائج التحليل:</h4>
              <div className="text-sm space-y-2 prose prose-sm max-w-none">
                {renderAnalysis(analysis)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fines;