import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseTypeService } from '../expense-type.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-expense-type-list',
  templateUrl: './expense-type-list.component.html',
  styleUrls: ['./expense-type-list.component.css']
})
export class ExpenseTypeListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  constructor(private route: ActivatedRoute, private expenseTypeService: ExpenseTypeService,
    private router: Router, private _notify: NotificationService) { }

  ngOnInit() {
    this.expenseTypeService.getAllExpenseTypes().subscribe(response => {
      this.rows = response;
      setTimeout(() => { this.loadingIndicator = false; });
    }, error => {
      this._notify.error(error.Result);
    });
  }


  editClick(id) {
    this.router.navigateByUrl(`/expense-type/${id}`);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete this task time tracking?')) {
      this.expenseTypeService.deleteExpenseType(id).subscribe(
        response => {
          this.rows = this.rows.filter(row => {
            return row.Id !== id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

}
