// FIX: Add .ts extension to file path to resolve module error.
import { Status, License, Employee, Fine, Subscription, Expense, User, UserRole } from '../types.ts';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 5);
const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 20);
const older = new Date(today);
older.setMonth(today.getMonth() - 2);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockLicenses: License[] = [
  { id: 'lic1', name: 'رخصة الدفاع المدني', authority: 'الدفاع المدني', expiryDate: '2024-08-15', status: Status.ExpiresSoon },
  { id: 'lic2', name: 'رخصة بلدية', authority: 'الأمانة العامة', expiryDate: '2024-05-20', status: Status.Expired },
  { id: 'lic3', name: 'السجل التجاري', authority: 'وزارة التجارة', expiryDate: '2025-01-10', status: Status.Active },
];

export const mockEmployees: Employee[] = [
  { id: 'emp1', name: 'أحمد محمود', iqamaStatus: Status.Active, iqamaExpiry: '2025-11-20', insuranceStatus: Status.ExpiresSoon, insuranceExpiry: '2024-07-30', contractStatus: Status.Active },
  { id: 'emp2', name: 'محمد عبدالله', iqamaStatus: Status.Expired, iqamaExpiry: '2024-06-01', insuranceStatus: Status.Active, insuranceExpiry: '2026-02-10', contractStatus: Status.NeedsAction },
  { id: 'emp3', name: 'سارة علي', iqamaStatus: Status.Active, iqamaExpiry: '2026-03-15', insuranceStatus: Status.Active, insuranceExpiry: '2025-09-05', contractStatus: Status.Active },
];

export const mockFines: Fine[] = [
  { id: 'fine1', authority: 'المرور', description: 'مخالفة وقوف خاطئ', amount: 300, status: Status.Unpaid, date: '2024-05-10' },
  { id: 'fine2', authority: 'البلدية', description: 'عدم تجديد لوحة المحل', amount: 1000, status: Status.Unpaid, date: '2024-04-22' },
  { id: 'fine3', authority: 'وزارة العمل', description: 'مخالفة نسبة التوطين', amount: 5000, status: Status.Paid, date: '2024-02-15' },
];

export const mockSubscriptions: Subscription[] = [
    { id: 'sub1', name: 'اشتراك برنامج المحاسبة', amount: 1200, renewalDate: '2024-09-01', status: Status.OnTrack },
    { id: 'sub2', name: 'اشتراك منصة G Suite', amount: 850, renewalDate: '2024-07-15', status: Status.ExpiresSoon },
];

export const mockExpenses: Expense[] = [
    { id: 'exp1', item: 'فاتورة كهرباء', category: 'فواتير', amount: 450, date: '2024-06-05' },
    { id: 'exp2', item: 'إيجار المكتب', category: 'إيجار', amount: 5000, date: '2024-06-01' },
    { id: 'exp3', item: 'مستلزمات مكتبية', category: 'مشتريات', amount: 250, date: '2024-05-28' },
];

export const mockUsers: User[] = [
    { id: 'user1', name: 'عبدالله الأحمد', email: 'abdullah@example.com', role: UserRole.Admin, status: Status.Active, lastLogin: formatDate(today) },
    { id: 'user2', name: 'فاطمة الزهراء', email: 'fatima@example.com', role: UserRole.Manager, status: Status.Active, lastLogin: formatDate(lastWeek) },
    { id: 'user3', name: 'خالد الغامدي', email: 'khaled@example.com', role: UserRole.Employee, status: Status.Active, lastLogin: formatDate(lastMonth) },
    { id: 'user4', name: 'نورة المطيري', email: 'noura@example.com', role: UserRole.Employee, status: Status.Pending, lastLogin: formatDate(older) },
    { id: 'user5', name: 'سلطان القحطاني', email: 'sultan@example.com', role: UserRole.Manager, status: Status.Active, lastLogin: formatDate(yesterday) },
];