import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DropDownModel } from 'app/models/DropDownModel';
import { Contact, Address } from 'app/models/contact';
import { ContactService } from '../contact.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { ContactType, AddressType, DealOn } from 'app/shared/constants';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {

  model: Contact = new Contact();
  isLoading: boolean = false;
  public paramId: any;
  ContactTypeDropDown: Array<DropDownModel> = ContactType;
  DealOnDropDown: Array<DropDownModel> = DealOn;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  companies: any[] = [];

  addressSet = [{ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', IsPrimary: true, IsDeleted: false }];
  officeAddressSet = [{ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', IsPrimary: true, IsDeleted: false }];
  emailSet = [{ Id: undefined, EmailId: '', IsPrimary: true, IsDeleted: false }];
  visibleEmail: number = 0;
  mobileSet = [{ Id: undefined, MobileNumber: '', IsPrimary: true, IsDeleted: false }];

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router,
    private _notify: NotificationService) { }

  ngOnInit() {
    this.model.ContactType = this.ContactTypeDropDown[0].Id;
    this.route.params.subscribe(param => this.paramId = param["id"]);
    this.contactService.getCountries().subscribe(res => {
      this.countries = res;
    });

    this.contactService.getCompanies().subscribe(res => {
      this.companies = res;
    });

    if (this.paramId.toString() != "new") {
      this.contactService.getContactById(this.paramId).subscribe(
        response => {
          this.model = <Contact>response;
        }, err => {
          this._notify.error(err.Result);
        });
      this.contactService.getAddressByContactId(this.paramId).subscribe(
        response => {
          this.addressSet = [];
          this.officeAddressSet = [];
          response.forEach(element => {
            if (element.AddressType === AddressType.Home) {
              this.addressSet.push({
                Address1: element.Address1,
                Id: element.Id,
                City: element.City,
                IsDeleted: false,
                IsPrimary: element.IsPrimary,
                PostCode: element.PostCode,
                State: element.State
              });
            } else {
              this.officeAddressSet.push({
                Address1: element.Address1,
                Id: element.Id,
                City: element.City,
                IsDeleted: false,
                IsPrimary: element.IsPrimary,
                PostCode: element.PostCode,
                State: element.State
              });
            }
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

  // increaseEmailCnt() {
  //   this.visibleEmail++;
  // }

  CountryChanges(countryId: number) {
    this.contactService.getStates(countryId).subscribe(res => {
      this.states = res;
    });
  }

  StateChanges(stateId: number) {
    this.contactService.getCities(stateId).subscribe(res => {
      this.cities = res;
    });
  }

  addAddress() {
    this.addressSet.push({ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', IsPrimary: false, IsDeleted: false });
  }

  addOfficeAddress() {
    this.officeAddressSet.push({ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', IsPrimary: false, IsDeleted: false });
  }

  addEmail() {
    this.emailSet.push({ Id: undefined, EmailId: '', IsPrimary: false, IsDeleted: false });
  }

  addMobile() {
    this.mobileSet.push({ Id: undefined, MobileNumber: '', IsPrimary: false, IsDeleted: false });
  }

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
              AddressType: AddressType.Home
            }
            this.model.Address.push(addressModel);
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
            AddressType: AddressType.Home
          }
          this.model.Address.push(addressModel);
        }
      });
      this.officeAddressSet.forEach(address => {
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
              AddressType: AddressType.Office
            }
            this.model.Address.push(addressModel);
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
            AddressType: AddressType.Office
          }
          this.model.Address.push(addressModel);
        }
      });
    }
    this.contactService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
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
                AddressType: AddressType.Home
              }
              if (addressModel.Address1 && addressModel.State) {
                this.model.Address.push(addressModel);
              }
            });
            this.officeAddressSet.forEach(address => {
              const addressModel: Address = {
                Id: undefined,
                Address1: address.Address1,
                City: address.City,
                ContactId: response.Id,
                IsPrimary: address.IsPrimary,
                State: address.State,
                PostCode: address.PostCode,
                AddressType: AddressType.Office
              }
              if (addressModel.Address1 && addressModel.State) {
                this.model.Address.push(addressModel);
              }
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
        this._notify.error(err.Result);
      });
  }

  onCancleClick() {
    this.router.navigate(['/contact']);
  }
}
