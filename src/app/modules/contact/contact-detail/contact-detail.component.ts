import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DropDownModel } from 'app/models/DropDownModel';
import { Contact } from 'app/models/contact';
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
          debugger;
          this._notify.error(err.Result);
        });
    }
  }

  save() {
    this.isLoading = true;
    this.contactService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
        debugger;
        if (response) {
          if (this.paramId === 'new') {
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
