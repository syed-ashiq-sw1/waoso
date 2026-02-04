export interface Leave {
  id?: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Sick' | 'Casual' | 'Earned' | 'Unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: string;
  updatedAt?: string;
}
