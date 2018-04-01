import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { CaseService } from 'app/modules/case/case.service';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { CaseChangeStatusComponent } from '../case-change-status/case-change-status.component';
import { overlayConfigFactory } from 'ngx-modialog';
import { Page, Sorting, FilterModel } from 'app/models/page';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html'
})
export class CaseListComponent implements OnInit {
  rows = [];
  public page: Page = new Page();
  loadingIndicator: boolean = false;
  sorting: Sorting = new Sorting();
  reorderable: boolean = true;
  filterModel: FilterModel[] = [{
    columnName: 'CaseNo',
    value: ''
  }, {
    columnName: 'CaseType',
    value: ''
  }, {
    columnName: 'RefferenceNumber',
    value: ''
  }, {
    columnName: 'CaseStatus',
    value: ''
  }];
  constructor(private caseService: CaseService, private router: Router, private _notify: NotificationService,
    private modal: Modal) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.sorting = { columnName: "Id", dir: true };
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.getDataSource();
  }

  getDataSource(filterColumn?: string, filterValue?: string) {
    this.loadingIndicator = true;
    this.caseService.getCasePageData(this.page, this.sorting, filterColumn, filterValue).subscribe(pagedData => {
      this.loadingIndicator = false;
      this.page.totalElements = pagedData.TotalNumberOfRecords;
      this.page.totalPages = pagedData.TotalNumberOfPages;
      this.page.pageNumber = pagedData.PageNumber;
      this.rows = pagedData.Results;
    });
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

  filterData(event) {
    const target = event.target;
    let filter = this.filterModel.filter(x => x.value.length >= 2);
    if (filter.length) {
      let filterColumnString = 'columnName=';
      let searchValue = '&searchValue='
      filter.forEach((model) => {
        filterColumnString += model.columnName + ",";
        searchValue += model.value + ",";
      });
      filterColumnString = filterColumnString.substring(0, filterColumnString.length - 1);
      searchValue = searchValue.substring(0, searchValue.length - 1);
      this.getDataSource(filterColumnString, searchValue);
    } else {
      this.getDataSource();
    }
  }

  editClick(id) {
    this.router.navigateByUrl('/case/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete case?')) {
      this.caseService.deleteCase(id).subscribe(
        response => {
          this.rows = this.rows.filter(row => {
            return row.Id != id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

  changeStatus(rowData: any) {
    this.modal.open(CaseChangeStatusComponent, overlayConfigFactory({ caseRow: rowData }, BSModalContext));
  }

  showCommunication(rowData: any) {
    this.router.navigateByUrl('/case/' + rowData.Id + '/communication/dashboard');
  }
  ShowTimeTracker(rowData: any) {
    this.router.navigateByUrl(`/case/${rowData.Id}/time-tracking`);
  }
  ShowNotes(rowData: any) {
    this.router.navigateByUrl(`/case/${rowData.Id}/note`);
  }
}
