import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>{{ isEdit ? 'Edit Leave' : 'Apply for Leave' }}</h2>
      
      <form [formGroup]="leaveForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            formControlName="employeeId"
            placeholder="Enter your employee ID"
            required
          />
        </div>

        <div class="form-group">
          <label for="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            formControlName="employeeName"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="leaveType">Leave Type</label>
          <select id="leaveType" formControlName="leaveType" required>
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
            <option value="Earned">Earned Leave</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              formControlName="startDate"
              required
            />
          </div>

          <div class="form-group">
            <label for="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              formControlName="endDate"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="reason">Reason</label>
          <textarea
            id="reason"
            formControlName="reason"
            placeholder="Enter reason for leave"
            required
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!leaveForm.valid">
            {{ isEdit ? 'Update' : 'Submit' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="onCancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  isEdit = false;
  leaveId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.leaveId = params['id'];
        const leave = this.leaveService.getLeaveById(params['id']);
        if (leave) {
          this.leaveForm.patchValue(leave);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const leaveData: Leave = this.leaveForm.value;
      
      if (this.isEdit && this.leaveId) {
        this.leaveService.updateLeave(this.leaveId, leaveData);
      } else {
        this.leaveService.addLeave(leaveData);
      }
      
      this.router.navigate(['/leaves']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/leaves']);
  }
}
