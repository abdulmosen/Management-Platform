export enum Status {
  Active = 'نشط',
  Pending = 'قيد المراجعة',
  ExpiresSoon = 'ينتهي قريبًا',
  Expired = 'منتهي الصلاحية',
  Unpaid = 'غير مدفوع',
  Paid = 'مدفوع',
  NeedsAction = 'يحتاج إجراء',
  OnTrack = 'في المسار الصحيح',
}

export enum UserRole {
  Admin = 'مدير نظام',
  Manager = 'مدير',
  Employee = 'موظف',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  lastLogin: string;
}

export interface License {
  id: string;
  name: string;
  authority: string;
  expiryDate: string;
  status: Status;
}

export interface Employee {
  id: string;
  name: string;
  iqamaStatus: Status;
  iqamaExpiry: string;
  insuranceStatus: Status;
  insuranceExpiry: string;
  contractStatus: Status;
}

export interface Fine {
  id: string;
  authority: string;
  description: string;
  amount: number;
  status: Status;
  date: string;
}

export interface Subscription {
  id: string;
  name:string;
  amount: number;
  renewalDate: string;
  status: Status;
}

export interface Expense {
  id: string;
  item: string;
  category: string;
  amount: number;
  date: string;
}