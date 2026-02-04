import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <h1>Leave Management System</h1>
        <nav>
          <a routerLink="/leaves" routerLinkActive="active">My Leaves</a>
          <a routerLink="/apply" routerLinkActive="active">Apply Leave</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #007bff;
      color: white;
      padding: 20px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    nav {
      display: flex;
      gap: 20px;

      a {
        color: white;
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 4px;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  `]
})
export class HeaderComponent {}
