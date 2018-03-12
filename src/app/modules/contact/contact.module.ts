import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactService } from './contact.service';
import { contactRouting } from './contact.routing';
import { SharedModule } from 'app/shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ContactDashboardComponent } from './contact-dashboard/contact-dashboard.component';

import { TabsModule } from "ng2-tabs";
import { ContactGridComponent } from './contact-grid/contact-grid.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    contactRouting,
    TabsModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    AddressComponent,
    ContactDashboardComponent,
    ContactGridComponent
  ],
  providers: [ContactService]
})
export class ContactModule { }
