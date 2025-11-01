

import React, { useState } from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { mockLicenses } from '../../data/mockData.ts';
import { License, Status } from '../../types.ts';
import StatusPill from '../ui/StatusPill';
// FIX: Add .tsx extension to file path to resolve module error.
import { Upload, Calendar } from '../icons/Icons.tsx';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import DatePicker from '../ui/DatePicker';

const Licenses: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>(mockLicenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLicense, setNewLicense] = useState({ name: '', authority: '', expiryDate: '' });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLicense(prev => ({ ...prev, [name]: value }));
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setDatePickerOpen(false); // Close date picker when modal closes
    setNewLicense({ name: '', authority: '', expiryDate: '' }); // Reset form
  };

  const handleAddLicense = () => {
    if (!newLicense.name || !newLicense.authority || !newLicense.expiryDate) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const expiry = new Date(newLicense.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    let status: Status;
    if (expiry < today) {
      status = Status.Expired;
    } else if (expiry <= thirtyDaysFromNow) {
      status = Status.ExpiresSoon;
    } else {
      status = Status.Active;
    }

    const licenseToAdd: License = {
      id: `lic${Date.now()}`, // Use timestamp for a more unique ID
      ...newLicense,
      status: status,
    };

    setLicenses(prevLicenses => [licenseToAdd, ...prevLicenses].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()));
    
    closeModal();
  };


  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">إدارة التراخيص</h2>
          <Button onClick={() => setIsModalOpen(true)}>إضافة ترخيص جديد</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">اسم الترخيص</th>
                <th scope="col" className="px-6 py-4 font-semibold">الجهة</th>
                <th scope="col" className="px-6 py-4 font-semibold">تاريخ الانتهاء</th>
                <th scope="col" className="px-6 py-4 font-semibold">الحالة</th>
                <th scope="col" className="px-6 py-4 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((license, index) => (
                <tr key={license.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{license.name}</td>
                  <td className="px-6 py-4">{license.authority}</td>
                  <td className="px-6 py-4">{license.expiryDate}</td>
                  <td className="px-6 py-4">
                    <StatusPill status={license.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 hover:underline flex items-center">
                      <Upload className="w-4 h-4 ml-2" />
                      رفع ملف PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="إضافة ترخيص جديد">
        <div className="space-y-4">
          <Input
            label="اسم الترخيص"
            id="name"
            name="name"
            value={newLicense.name}
            onChange={handleInputChange}
            placeholder="مثال: رخصة الدفاع المدني"
            required
          />
          <Input
            label="الجهة المسؤولة"
            id="authority"
            name="authority"
            value={newLicense.authority}
            onChange={handleInputChange}
            placeholder="مثال: الدفاع المدني"
            required
          />
          <div className="relative">
            <label htmlFor="expiryDate-button" className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الانتهاء
            </label>
            <button 
              id="expiryDate-button"
              type="button" 
              onClick={() => setDatePickerOpen(!isDatePickerOpen)}
              className="bg-white border border-[var(--color-border)] text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block w-full p-2.5 transition-colors text-right flex justify-between items-center"
            >
              <span className={newLicense.expiryDate ? 'text-gray-900' : 'text-gray-400'}>
                {newLicense.expiryDate || 'اختر تاريخًا'}
              </span>
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
            {isDatePickerOpen && (
              <DatePicker 
                selectedDate={newLicense.expiryDate}
                onSelectDate={(date) => {
                  handleInputChange({ target: { name: 'expiryDate', value: date } } as React.ChangeEvent<HTMLInputElement>);
                  setDatePickerOpen(false);
                }}
                onClose={() => setDatePickerOpen(false)}
              />
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleAddLicense}>
              حفظ الترخيص
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Licenses;