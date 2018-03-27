import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CaseExpenseService } from '../case-expense.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';
import { Page, Sorting } from 'app/models/page';

@Component({
  selector: 'app-case-expense-list',
  templateUrl: './case-expense-list.component.html'
})
export class CaseExpenseListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  page: Page = new Page();
  @ViewChild('grid') grid: ElementRef;
  sorting: Sorting = new Sorting();
  allRows = [];
  filter: { columnName: string, value: string }[] = [];
  constructor(private caseExpenseService: CaseExpenseService, private router: Router, private _notify: NotificationService) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.sorting = { columnName: "Id", dir: true }
    this.setPage({ offset: 0 });
  }


  setPage(pageInfo) {
    this.loadingIndicator = true;
    this.page.pageNumber = pageInfo.offset;
    this.getDataSource();
  }

  onSort(sort: any) {
    this.loadingIndicator = true;
    if (sort && sort.sorts[0]) {
      this.sorting = {
        columnName: sort.sorts[0].prop,
        dir: sort.sorts[0].dir === 'asc'
      };
    }
    return this.getDataSource();
  }

  getDataSource() {
    this.caseExpenseService.getCaseExpensesPageData(this.page, this.sorting).subscribe(pagedData => {
      this.loadingIndicator = false;
      this.page.totalElements = pagedData.TotalNumberOfRecords;
      this.page.totalPages = pagedData.TotalNumberOfPages;
      this.page.pageNumber = pagedData.PageNumber;
      this.allRows = pagedData.Results;
      this.rows = pagedData.Results;
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

  filterData(event) {
    const target = event.target;
    if (target.value.length >= 2) {
      const index = this.filter.findIndex(x => x.columnName === target.dataset.columnName);
      if (index > -1) {
        this.filter[index].value = target.value;
      } else {
        this.filter.push({ columnName: target.dataset.columnName, value: target.value });
      }
      this.rows = this.allRows.filter(x => x[target.dataset.columnName].toLowerCase().indexOf(target.value) > -1);
    } else {
      this.rows = Object.assign([], this.allRows);
    }
  }
}
