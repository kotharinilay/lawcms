import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';

const routes: Routes = [
    { path: '', component: DocumentListComponent },
    { path: ':id', component: DocumentDetailComponent }
];

export const documentRouting: ModuleWithProviders = RouterModule.forChild(routes);
