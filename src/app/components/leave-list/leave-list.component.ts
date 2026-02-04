import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="header-section">
        <h2>My Leave Applications</h2>
        <a routerLink="/apply" class="btn btn-primary">Apply New Leave</a>
      </div>

      <div *ngIf="leaves.length === 0" class="alert alert-success">
        No leave applications found.
      </div>

      <table *ngIf="leaves.length > 0">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let leave of leaves">
            <td>{{ leave.employeeName }}</td>
            <td>{{ leave.leaveType }}</td>
            <td>{{ leave.startDate }}</td>
            <td>{{ leave.endDate }}</td>
            <td>{{ leave.reason }}</td>
            <td>
              <span [ngClass]="'badge badge-' + leave.status.toLowerCase()">
                {{ leave.status }}
              </span>
            </td>
            <td>
              <div class="actions">
                <a [routerLink]="['/edit', leave.id]" class="btn btn-secondary">Edit</a>
                <button (click)="onDelete(leave.id!)" class="btn btn-secondary">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .actions {
      display: flex;
      gap: 8px;

      a, button {
        padding: 6px 12px;
        font-size: 12px;
      }
    }

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      table {
        font-size: 12px;

        th, td {
          padding: 8px;
        }
      }
    }
  `]
})
export class LeaveListComponent implements OnInit {
  leaves: Leave[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe(leaves => {
      this.leaves = leaves;
    });
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this leave application?')) {
      this.leaveService.deleteLeave(id);
    }
  }
}
