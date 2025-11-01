
import React from 'react';
// FIX: Add .ts extension to file paths to resolve module errors.
import { mockLicenses, mockEmployees, mockFines } from '../../data/mockData.ts';
import { Status } from '../../types.ts';
import Card from '../ui/Card';
import { ViewType } from '../../app.config.ts';
// FIX: Add .tsx extension to file path to resolve module error.
import { ArrowLeft, FileText, Users, AlertTriangle } from '../icons/Icons.tsx';

interface DashboardOverviewProps {
  setActiveView: (view: ViewType) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveView }) => {
  // Fix: Corrected invalid variable name. This resolves the "Cannot redeclare block-scoped variable" error.
  const licensesExpiringSoon = mockLicenses.filter(l => l.status === Status.ExpiresSoon || l.status === Status.Expired).length;
  // Fix: Corrected invalid variable name.
  const employeeDocsExpiringSoon = mockEmployees.filter(e => e.iqamaStatus !== Status.Active || e.insuranceStatus !== Status.Active).length;
  const unpaidFines = mockFines.filter(f => f.status === Status.Unpaid).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">نظرة عامة سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="التراخيص الحرجة"
            icon={<div className="p-3 rounded-full bg-orange-100 text-orange-600"><FileText className="w-6 h-6" /></div>}
            value={licensesExpiringSoon.toString()}
            onClick={() => setActiveView('licenses')}
          >
            <p className="text-sm text-gray-500">رخصة تحتاج تجديد أو متابعة.</p>
          </Card>
          <Card
            title="وثائق الموظفين"
            icon={<div className="p-3 rounded-full bg-blue-100 text-blue-600"><Users className="w-6 h-6" /></div>}
            value={employeeDocsExpiringSoon.toString()}
            onClick={() => setActiveView('employees')}
          >
            <p className="text-sm text-gray-500">إقامة أو تأمين يحتاج تجديد.</p>
          </Card>
          <Card
            title="الغرامات المستحقة"
            icon={<div className="p-3 rounded-full bg-red-100 text-red-600"><AlertTriangle className="w-6 h-6" /></div>}
            value={unpaidFines.toString()}
            onClick={() => setActiveView('fines')}
          >
             <p className="text-sm text-gray-500">غرامة غير مدفوعة.</p>
          </Card>
        </div>
      </div>

      <div>
         <h2 className="text-2xl font-bold mb-4 text-gray-800">قائمة المهام العاجلة</h2>
         <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            {mockLicenses.filter(l => l.status === Status.Expired).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                        <FileText className="w-5 h-5 text-red-500 ml-3" />
                        <p>
                            <span className="font-bold text-red-700">رخصة منتهية:</span> {item.name} انتهت في {item.expiryDate}.
                        </p>
                    </div>
                    <button onClick={() => setActiveView('licenses')} className="text-sm text-blue-600 hover:underline flex items-center">
                        عرض التفاصيل <ArrowLeft className="w-4 h-4 mr-1" />
                    </button>
                </div>
            ))}
            {mockEmployees.filter(e => e.iqamaStatus === Status.Expired).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                        <Users className="w-5 h-5 text-red-500 ml-3" />
                        <p>
                            <span className="font-bold text-red-700">إقامة منتهية:</span> إقامة الموظف {item.name} انتهت في {item.iqamaExpiry}.
                        </p>
                    </div>
                    <button onClick={() => setActiveView('employees')} className="text-sm text-blue-600 hover:underline flex items-center">
                        عرض التفاصيل <ArrowLeft className="w-4 h-4 mr-1" />
                    </button>
                </div>
            ))}
             {mockFines.filter(f => f.status === Status.Unpaid).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 ml-3" />
                        <p>
                            <span className="font-bold text-yellow-700">غرامة غير مدفوعة:</span> غرامة من {item.authority} بقيمة {item.amount} ريال.
                        </p>
                    </div>
                    <button onClick={() => setActiveView('fines')} className="text-sm text-blue-600 hover:underline flex items-center">
                        عرض التفاصيل <ArrowLeft className="w-4 h-4 mr-1" />
                    </button>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardOverview;