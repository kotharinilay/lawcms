import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'app/modules/contact/contact.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Page, Sorting, FilterModel } from '../../../models/page';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html'
})
export class ContactGridComponent implements OnInit {
  @Input() data: any[];
  @Input() showAction: boolean;
  @Input() page: Page;
  @Input() filterModel: FilterModel[];
  @Input() cType: string;
  @Input() loadingIndicator: boolean;
  @Output() getPageData: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSortChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  _data: any[];

  constructor(private contactService: ContactService, private router: Router, private _notify: NotificationService,
    private modalDialog: Modal) { }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;
    this._data = data ? data.currentValue : [];
  }

  onSort(event) {

    debugger
    this.onSortChange.emit(event);
  }

  filterData(event) {
    this.onFilter.emit(event);
  }

  setPage(event) {
    debugger
    this.getPageData.emit(event);
  }

  ngOnInit() {
  }

  editClick(id) {
    this.router.navigateByUrl('/contact/' + id);
  }

  deleteClick(id) {
    let x = this.modalDialog.confirm()
      .size('sm')
      .title('Delete Contact')
      .body(`Are you sure want to delete Contact ?`).open()
      .result.then(result => {
        if (result === true) {
          this.contactService.deleteContact(id).subscribe(
            response => {
              this._data = this.data.filter(row => {
                return row.Id != id;
              });
            }, err => {
              this._notify.error(err.Result);
            });
        }
      });
  }
  toggleImportant(row) {
    this.loadingIndicator = true;
    this.contactService.toggleImportant(row.Id).subscribe(response => {
      row.IsImportant = !row.IsImportant;
      this.loadingIndicator = false;
    }, error => {
      this.loadingIndicator = false;
      this._notify.error(error.detail);
    });
  }

}
