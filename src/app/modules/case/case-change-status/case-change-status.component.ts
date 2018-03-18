import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloseGuard, ModalComponent, DialogRef } from 'angular2-modal';

import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-case-change-status',
  templateUrl: './case-change-status.component.html'
})
export class CaseChangeStatusComponent implements OnInit, OnDestroy, CloseGuard, ModalComponent<BSModalContext> {
  context: BSModalContext;
  loading: boolean = false;

  constructor(public dialog: DialogRef<BSModalContext>) { }

  ngOnInit() {
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  closeClick = () => {
    this.dialog.close(true);
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(s => s.unsubscribe());
  }
}
