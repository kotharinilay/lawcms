import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { Page, Sorting, FilterModel } from '../../../models/page';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {
  public rows: any[];
  public page: Page = new Page();
  loadingIndicator: boolean = false;
  sorting: Sorting = new Sorting();

  filterModel: FilterModel[] = [{
    columnName: 'CompanyName',
    value: ''
  }, {
    columnName: 'InsdustrySection',
    value: ''
  }, {
    columnName: 'Category',
    value: ''
  }, {
    columnName: 'Website',
    value: ''
  }, {
    columnName: 'CompanySize',
    value: ''
  }];

  constructor(private companiesService: CompaniesService, private router: Router, private _notify: NotificationService) {
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
    this.companiesService.companiesPageData(this.page, this.sorting, filterColumn, filterValue).subscribe(pagedData => {
      this.loadingIndicator = false;
      this.page.totalElements = pagedData.TotalNumberOfRecords;
      this.page.totalPages = pagedData.TotalNumberOfPages;
      this.page.pageNumber = pagedData.PageNumber;
      this.rows = pagedData.Results;
    });
  }

  editClick(id) {
    this.router.navigateByUrl('/companies/' + id);
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

  deleteClick(id) {
    if (confirm('Are you sure you want to delete case expense?')) {
      this.companiesService.deleteCompany(id).subscribe(
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

}
