import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { documentRouting } from './document.routing';
import { SharedModule } from 'app/shared/shared.module';
import { DocumentService } from './document.service';
import { CaseService } from '../case/case.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    documentRouting
  ],
  declarations: [
    DocumentListComponent,
    DocumentDetailComponent
  ],
  providers: [
    DocumentService,
    CaseService
  ]
})
export class DocumentModule { }
