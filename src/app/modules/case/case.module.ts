import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { SharedModule } from 'app/shared/shared.module';
import { CaseService } from './case.service';
import { caseRouting } from 'app/modules/case/case.routing';
import { CaseAddComponent } from './case-add/case-add.component';
import { ContactService } from '../contact/contact.service';
import { CaseChangeStatusComponent } from './case-change-status/case-change-status.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { BootstrapModalModule, Modal } from 'ngx-modialog/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    caseRouting,
    AngularMultiSelectModule,
    BootstrapModalModule
  ],
  declarations: [
    CaseListComponent,
    CaseDetailComponent,
    CaseAddComponent,
    CaseChangeStatusComponent
  ],
  providers: [
    CaseService,
    ContactService,
    Modal
  ],
  entryComponents: [CaseChangeStatusComponent]
})
export class CaseModule { }
