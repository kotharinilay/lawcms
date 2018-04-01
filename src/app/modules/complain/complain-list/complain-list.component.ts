import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { ComplainService } from 'app/modules/complain/complain.service';
import { FilterModel, Page, Sorting } from 'app/models/page';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html'
})
export class ComplainListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  public page: Page = new Page();
  sorting: Sorting = new Sorting();
  filterModel: FilterModel[] = [{
    columnName: 'ComplainByName',
    value: ''
  }, {
    columnName: 'ComplainOfName',
    value: ''
  }, {
    columnName: 'ComplainStatus',
    value: ''
  }];

  constructor(private complainService: ComplainService,
    private router: Router,
    private _notify: NotificationService) {
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
    this.complainService.getCompainPageData(this.page, this.sorting, filterColumn, filterValue).subscribe(pagedData => {
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
    this.router.navigateByUrl('/complain/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete complain?')) {
      this.complainService.deleteComplain(id).subscribe(
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
