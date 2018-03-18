import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/modules/contact/contact.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { contactDashboardTab } from 'app/shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html'
})
export class ContactDashboardComponent implements OnInit {

  dashboardData: any = {};
  rows = [];

  constructor(private contactService: ContactService, private _notify: NotificationService, private router: Router) { }

  ngOnInit() {
    this.contactService.getDashboardData().subscribe(res => {
      this.dashboardData = res;
    }, err => {
      this._notify.error(err.Result);
    });
    this.getNewlyAddedData();
  }

  getNewlyAddedData() {
    this.rows = [];
    this.contactService.getNewlyAddedContacts().subscribe(res => {
      this.rows = res;
    }, err => {
      this._notify.error(err.Result);
    });
  }

  tabSelect(event) {
    this.rows = [];
    this.contactService.getContactsByType(contactDashboardTab[event]).subscribe(res => {
      this.rows = res;
    }, err => {
      this._notify.error(err.Result);
    });
  }

}
