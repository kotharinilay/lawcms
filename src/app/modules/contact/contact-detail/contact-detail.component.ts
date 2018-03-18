import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DropDownModel } from 'app/models/DropDownModel';
import { Contact, Address, Mobile, Email } from 'app/models/contact';
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

  addressSet = [{ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', Country: undefined, IsPrimary: true, IsDeleted: false }];
  officeAddressSet = [{ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', Country: undefined, IsPrimary: true, IsDeleted: false }];
  emailSet = [{ Id: undefined, EmailId: '', IsPrimary: true, IsDeleted: false }];
  visibleEmail: number = 0;
  mobileSet = [{ Id: undefined, MobileNumber: '', IsPrimary: true, IsDeleted: false }];

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router,
    private _notify: NotificationService) { }

  ngOnInit() {
    this.model.ContactType = this.ContactTypeDropDown[0].Id;
    this.model.Address = [];
    this.model.EmailAddress = [];
    this.model.MobileNumbers = [];
    this.route.params.subscribe(param => this.paramId = param["id"]);
    this.contactService.getCountries().subscribe(res => {
      this.countries = res;
    });

    this.contactService.getCompanies().subscribe(res => {
      this.companies = res;
    });

    this.contactService.getAllCities().subscribe(res => {
      this.cities = res;
    });

    this.contactService.getAllStates().subscribe(res => {
      this.states = res;
    });

    if (this.paramId.toString() != "new") {
      this.contactService.getContactById(this.paramId).subscribe(
        response => {
          debugger;
          this.model = <Contact>response;

          this.addressSet = [];
          this.officeAddressSet = [];
          this.mobileSet = [];
          this.emailSet = [];

          this.model.Address.forEach(element => {
            if (element.AddressType === AddressType.Home) {
              this.addressSet.push({
                Address1: element.Address1,
                Id: element.Id,
                City: element.CityId,
                IsDeleted: false,
                IsPrimary: element.IsPrimary,
                PostCode: element.PostCode,
                State: element.State,
                Country: element.CountryId
              });
            } else {
              this.officeAddressSet.push({
                Address1: element.Address1,
                Id: element.Id,
                City: element.CityId,
                IsDeleted: false,
                IsPrimary: element.IsPrimary,
                PostCode: element.PostCode,
                State: element.State,
                Country: element.CountryId
              });
            }
          });
          this.model.EmailAddress.forEach(element => {
            this.emailSet.push({
              Id: element.Id,
              IsDeleted: false,
              IsPrimary: element.IsPrimary,
              EmailId: element.EmailId
            });
          });

          this.model.MobileNumbers.forEach(element => {
            this.mobileSet.push({
              Id: element.Id,
              IsDeleted: false,
              IsPrimary: element.IsPrimary,
              MobileNumber: element.MobileNumber
            });
          });

        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

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
    this.addressSet.push({ Id: undefined, Address1: '', State: undefined, City: undefined, PostCode: '', Country: undefined, IsPrimary: false, IsDeleted: false });
  }

  addOfficeAddress() {
    this.officeAddressSet.push({ Id: undefined, Address1: '', State: undefined, City: undefined, Country: undefined, PostCode: '', IsPrimary: false, IsDeleted: false });
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
    this.addressSet.forEach(address => {
      if (address.Id) {
        if (address.IsDeleted) {
          this.contactService.deleteAddress(address.Id).subscribe(res => { });
        } else {
          const addressModel: Address = {
            Id: address.Id,
            Address1: address.Address1,
            CityId: address.City,
            CountryId: address.Country,
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
          CityId: address.City,
          CountryId: address.Country,
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
            CityId: address.City,
            CountryId: address.Country,
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
          CityId: address.City,
          CountryId: address.Country,
          IsPrimary: address.IsPrimary,
          State: address.State,
          PostCode: address.PostCode,
          AddressType: AddressType.Office
        }
        this.model.Address.push(addressModel);
      }
    });
    this.mobileSet.forEach(mobile => {
      if (mobile.Id) {
        if (mobile.IsDeleted) {
          this.contactService.deleteMobile(mobile.Id).subscribe(res => { });
        } else {
          const mobileModel: Mobile = {
            Id: mobile.Id,
            MobileNumber: mobile.MobileNumber,
            IsPrimary: mobile.IsPrimary
          }
          this.model.MobileNumbers.push(mobileModel);
        }
      } else {
        const mobileModel: Mobile = {
          Id: undefined,
          MobileNumber: mobile.MobileNumber,
          IsPrimary: mobile.IsPrimary
        }
        this.model.MobileNumbers.push(mobileModel);
      }
    });

    this.emailSet.forEach(email => {
      if (email.Id) {
        if (email.IsDeleted) {
          this.contactService.deleteMobile(email.Id).subscribe(res => { });
        } else {
          const emailModel: Email = {
            Id: email.Id,
            EmailId: email.EmailId,
            IsPrimary: email.IsPrimary
          }
          this.model.EmailAddress.push(emailModel);
        }
      } else {
        const emailModel: Email = {
          Id: undefined,
          EmailId: email.EmailId,
          IsPrimary: email.IsPrimary
        }
        this.model.EmailAddress.push(emailModel);
      }
    });

    this.contactService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
        if (response) {
          if (this.paramId === 'new') {
            // this.addressSet.forEach(address => {
            //   const addressModel: Address = {
            //     Id: undefined,
            //     Address1: address.Address1,
            //     City: address.City,
            //     ContactId: response.Id,
            //     IsPrimary: address.IsPrimary,
            //     State: address.State,
            //     PostCode: address.PostCode,
            //     AddressType: AddressType.Home
            //   }
            //   if (addressModel.Address1 && addressModel.State) {
            //     this.model.Address.push(addressModel);
            //   }
            //});
            // this.officeAddressSet.forEach(address => {
            //   const addressModel: Address = {
            //     Id: undefined,
            //     Address1: address.Address1,
            //     City: address.City,
            //     ContactId: response.Id,
            //     IsPrimary: address.IsPrimary,
            //     State: address.State,
            //     PostCode: address.PostCode,
            //     AddressType: AddressType.Office
            //   }
            //   if (addressModel.Address1 && addressModel.State) {
            //     this.model.Address.push(addressModel);
            //   }
            // });
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
