import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloseGuard, ModalComponent, DialogRef } from 'ngx-modialog';

import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { CaseStatus } from 'app/models/case';
import { CaseService } from '../case.service';

@Component({
  selector: 'app-case-change-status',
  templateUrl: './case-change-status.component.html'
})
export class CaseChangeStatusComponent implements OnInit, OnDestroy, CloseGuard, ModalComponent<BSModalContext> {
  context: BSModalContext;
  loading: boolean = false;
  cases: any[] = [];
  stages: any[] = [];
  courts: any[] = [];
  isLoading: boolean = false;

  constructor(public dialog: DialogRef<BSModalContext>, private caseService: CaseService) {
    dialog.context.dialogClass = "modal-dialog modal-lg";

  }
  model: CaseStatus = new CaseStatus();

  ngOnInit() {
    this.model.CaseId = this.dialog.context.caseRow.Id;
    this.caseService.getCases().subscribe(res => {
      this.cases = res;
    });
    this.caseService.getStages().subscribe(res => {
      this.stages = res;
    });
    this.caseService.getCourtsDD().subscribe(res => {
      this.courts = res;
    });
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  changeStatus() {
    this.caseService.addOrUpdateStatus(this.model).subscribe(res => {
      this.closeClick();
    }, err => {

    });
  }

  closeClick = () => {
    this.dialog.close(true);
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(s => s.unsubscribe());
  }
}
