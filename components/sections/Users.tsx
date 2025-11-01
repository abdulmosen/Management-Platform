
import React, { useState, useMemo } from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { mockUsers } from '../../data/mockData.ts';
// FIX: Add .ts extension to file path to resolve module error.
import { UserRole } from '../../types.ts';
// FIX: Add .tsx extension to file path to resolve module error.
import StatusPill from '../ui/StatusPill.tsx';
// FIX: Add .tsx extension to file path to resolve module error.
import RolePill from '../ui/RolePill.tsx';
import Button from '../ui/Button';
// FIX: Add .tsx extension to file path to resolve module error.
import Input from '../ui/Input.tsx';

type DateFilter = 'all' | 'today' | 'lastWeek' | 'lastMonth';

const Users: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredUsers = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lowerCaseQuery = searchQuery.toLowerCase();

    return mockUsers
      .filter(user => {
        if (roleFilter === 'all') return true;
        return user.role === roleFilter;
      })
      .filter(user => {
        if (dateFilter === 'all') return true;
        
        const lastLoginDate = new Date(user.lastLogin);
        if (isNaN(lastLoginDate.getTime())) return false;

        switch (dateFilter) {
          case 'today':
            return lastLoginDate.toDateString() === today.toDateString();
          case 'lastWeek':
            const oneWeekAgo = new Date(today);
            oneWeekAgo.setDate(today.getDate() - 7);
            return lastLoginDate >= oneWeekAgo;
          case 'lastMonth':
             const oneMonthAgo = new Date(today);
            oneMonthAgo.setMonth(today.getMonth() - 1);
            return lastLoginDate >= oneMonthAgo;
          default:
            return true;
        }
      })
      .filter(user => {
        if (!lowerCaseQuery) return true;
        return (
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
        );
      });
  }, [roleFilter, dateFilter, searchQuery]);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 md:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800 self-start md:self-center">إدارة المستخدمين</h2>
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
                <Input
                    id="user-search"
                    type="text"
                    placeholder="ابحث بالاسم أو البريد..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 w-full sm:w-48"
                />
                 <select
                    id="role-filter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
                    className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    >
                    <option value="all">كل الأدوار</option>
                    <option value={UserRole.Admin}>{UserRole.Admin}</option>
                    <option value={UserRole.Manager}>{UserRole.Manager}</option>
                    <option value={UserRole.Employee}>{UserRole.Employee}</option>
                </select>
                <select
                    id="date-filter"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                    className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    >
                    <option value="all">كل الأوقات</option>
                    <option value="today">اليوم</option>
                    <option value="lastWeek">الأسبوع الماضي</option>
                    <option value="lastMonth">الشهر الماضي</option>
                </select>
            </div>
            <div className="flex-shrink-0 self-end md:self-center">
                <Button>إضافة مستخدم</Button>
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">الاسم</th>
              <th scope="col" className="px-6 py-4 font-semibold">البريد الإلكتروني</th>
              <th scope="col" className="px-6 py-4 font-semibold">الدور</th>
              <th scope="col" className="px-6 py-4 font-semibold">آخر تسجيل دخول</th>
              <th scope="col" className="px-6 py-4 font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <RolePill role={user.role} />
                </td>
                <td className="px-6 py-4">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <StatusPill status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;