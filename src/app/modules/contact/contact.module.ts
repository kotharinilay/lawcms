import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactService } from './contact.service';
import { contactRouting } from './contact.routing';
import { SharedModule } from 'app/shared/shared.module';
import { AddressComponent } from './address/address.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    contactRouting
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    AddressComponent
  ],
  providers: [ContactService]
})
export class ContactModule { }
