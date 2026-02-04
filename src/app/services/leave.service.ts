import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaves$ = new BehaviorSubject<Leave[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      leaveType: 'Casual',
      startDate: '2026-02-10',
      endDate: '2026-02-12',
      reason: 'Personal work',
      status: 'Pending',
      createdAt: '2026-02-04'
    }
  ]);

  constructor() {}

  getLeaves(): Observable<Leave[]> {
    return this.leaves$.asObservable();
  }

  getLeaveById(id: string): Leave | undefined {
    return this.leaves$.value.find(l => l.id === id);
  }

  addLeave(leave: Leave): void {
    const newLeave: Leave = {
      ...leave,
      id: Date.now().toString(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    this.leaves$.next([...this.leaves$.value, newLeave]);
  }

  updateLeave(id: string, leave: Leave): void {
    const leaves = this.leaves$.value.map(l =>
      l.id === id ? { ...leave, id, updatedAt: new Date().toISOString() } : l
    );
    this.leaves$.next(leaves);
  }

  deleteLeave(id: string): void {
    this.leaves$.next(this.leaves$.value.filter(l => l.id !== id));
  }
}
