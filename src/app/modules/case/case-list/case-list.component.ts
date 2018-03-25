import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { CaseService } from 'app/modules/case/case.service';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { CaseChangeStatusComponent } from '../case-change-status/case-change-status.component';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html'
})
export class CaseListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  constructor(private caseService: CaseService, private router: Router, private _notify: NotificationService,
    private modal: Modal) { }

  ngOnInit() {
    this.caseService.getCases().subscribe(
      response => {
        this.rows = response;
        setTimeout(() => { this.loadingIndicator = false; });
      }, err => {
        this._notify.error(err.Result);
      });
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
    this.router.navigateByUrl('/case/' + rowData.Id + '/communication');
  }
}
