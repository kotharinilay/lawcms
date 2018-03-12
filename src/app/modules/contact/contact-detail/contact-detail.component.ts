import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DropDownModel } from 'app/models/DropDownModel';
import { Contact, Address } from 'app/models/contact';
import { ContactService } from '../contact.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {

  model: Contact = new Contact();
  isLoading: boolean = false;
  public paramId: any;
  public ContactTypeDropDown: Array<DropDownModel> = [
    { Id: "Client", Name: "Client" },
    { Id: "Advocate", Name: "Advocate" },
    { Id: "Contact", Name: "Contact" },
    { Id: "Company", Name: "Company" },
    { Id: "Witness", Name: "Witness" },
    { Id: "Opponent", Name: "Opponent" },
    { Id: "Associates", Name: "Associates" }];

  addressSet = [{ Id: undefined, Address1: '', State: '', City: '', PostCode: '', IsPrimary: true, IsDeleted: false }];

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router,
    private _notify: NotificationService) { }

  ngOnInit() {
    debugger;
    this.model.ContactType = this.ContactTypeDropDown[0].Id;
    this.route.params.subscribe(param => this.paramId = param["id"]);
    if (this.paramId.toString() != "new") {
      this.contactService.getContactById(this.paramId).subscribe(
        response => {
          this.model = <Contact>response;
        }, err => {
          this._notify.error(err.Result);
        });
      this.contactService.getAddressByContactId(this.paramId).subscribe(
        response => {
          debugger;
          this.addressSet = [];
          response.forEach(element => {
            this.addressSet.push({
              Address1: element.Address1,
              Id: element.Id,
              City: element.City,
              IsDeleted: false,
              IsPrimary: element.IsPrimary,
              PostCode: element.PostCode,
              State: element.State
            })
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

  addAddress() {
    this.addressSet.push({ Id: undefined, Address1: '', State: '', City: '', PostCode: '', IsPrimary: false, IsDeleted: false });
  }

  removeForm(addressForm) {
    if (!addressForm.IsPrimary) {
      addressForm.IsDeleted = true;
    } else {
      this._notify.error('Cannot delete primary address');
    }
  };

  save() {
    debugger;
    this.isLoading = true;
    if (this.model.Id) {
      this.addressSet.forEach(address => {
        if (address.Id) {
          if (address.IsDeleted) {
            this.contactService.deleteAddress(address.Id).subscribe(res => { });
          } else {
            const addressModel: Address = {
              Id: address.Id,
              Address1: address.Address1,
              City: address.City,
              ContactId: this.model.Id,
              IsPrimary: address.IsPrimary,
              State: address.State,
              PostCode: address.PostCode,
              AddressType: 'Home'
            }
            this.contactService.addOrUpdateAddress(addressModel).subscribe(res => { });
          }
        } else {
          const addressModel: Address = {
            Id: undefined,
            Address1: address.Address1,
            City: address.City,
            ContactId: this.model.Id,
            IsPrimary: address.IsPrimary,
            State: address.State,
            PostCode: address.PostCode,
            AddressType: 'Home'
          }
          this.contactService.addOrUpdateAddress(addressModel).subscribe(res => { });
        }
      });
    }
    this.contactService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
        debugger;
        if (response) {
          if (this.paramId === 'new') {
            this.addressSet.forEach(address => {
              const addressModel: Address = {
                Id: undefined,
                Address1: address.Address1,
                City: address.City,
                ContactId: response.Id,
                IsPrimary: address.IsPrimary,
                State: address.State,
                PostCode: address.PostCode,
                AddressType: 'Home'
              }
              this.contactService.addOrUpdateAddress(addressModel).subscribe(res => { });
            });
            this._notify.success("Contact added successfully.");
          }
          else {
            this._notify.success("Contact updated successfully.");
          }

          setTimeout(() => {
            this.router.navigate(['/contact']);
          });
        }
      }, err => {
        debugger;
        this._notify.error(err.Result);
      });
  }

  onCancleClick() {
    this.router.navigate(['/contact']);
  }
}
