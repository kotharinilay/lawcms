import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { SharedModule } from 'app/shared/shared.module';
import { CaseService } from './case.service';
import { caseRouting } from 'app/modules/case/case.routing';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CaseAddComponent } from './case-add/case-add.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    caseRouting,
    NgxMyDatePickerModule
  ],
  declarations: [
    CaseListComponent,
    CaseDetailComponent,
    CaseAddComponent
  ],
  providers: [
    CaseService
  ]
})
export class CaseModule { }
