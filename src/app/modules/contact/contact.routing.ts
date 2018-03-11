import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes = [
    // {
    //     path: '', component: ContactComponent,
    //     children: [
    //         { path: '', component: DriverListComponent },
    //         { path: 'zzzz', component: DriverDetailComponent }
    //     ]
    // }
    { path: '', component: ContactListComponent },
    { path: ':id', component: ContactDetailComponent }
];

export const contactRouting: ModuleWithProviders = RouterModule.forChild(routes);
