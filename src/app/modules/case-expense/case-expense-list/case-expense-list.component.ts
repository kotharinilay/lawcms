import { Component, OnInit } from '@angular/core';
import { CaseExpenseService } from '../case-expense.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-case-expense-list',
  templateUrl: './case-expense-list.component.html'
})
export class CaseExpenseListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  constructor(private caseExpenseService: CaseExpenseService, private router: Router, private _notify: NotificationService) { }

  ngOnInit() {
    this.caseExpenseService.getCaseExpenses().subscribe(
      response => {
        this.rows = response;
        setTimeout(() => { this.loadingIndicator = false; });
      }, err => {
        this._notify.error(err.Result);
      });
  }

  editClick(id) {
    this.router.navigateByUrl('/case-expense/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete case expense?')) {
      this.caseExpenseService.deleteCaseExpense(id).subscribe(
        response => {
          this.rows = this.rows.filter(row => {
            return row.Id != id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }
}
