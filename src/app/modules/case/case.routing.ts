import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailComponent } from 'app/modules/case/case-detail/case-detail.component';
import { CaseListComponent } from 'app/modules/case/case-list/case-list.component';
import { CaseAddComponent } from './case-add/case-add.component';


const routes: Routes = [
    { path: '', component: CaseListComponent },
    { path: ':id', component: CaseAddComponent }
];

export const caseRouting: ModuleWithProviders = RouterModule.forChild(routes);
