import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/modules/contact/contact.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { prop: 'Title', sortable: true },
    { prop: 'ContactType', sortable: true },
    { prop: 'FirstName', sortable: true },
    { prop: 'LastName', sortable: true },
    { prop: 'MobileNumber', sortable: true },
    { prop: 'EmailId', sortable: true },
    { prop: 'CompanyName', sortable: true },
    { prop: 'Website', sortable: true }
  ];

  constructor(private contactService: ContactService, private router: Router, private _notify: NotificationService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      response => {
        debugger;
        this.rows = response;
        setTimeout(() => { this.loadingIndicator = false; });
      }, err => {
        this._notify.error(err.Result);
      });
  }

  editClick(id) {
    this.router.navigateByUrl('/contact/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete ')) {
      this.contactService.deleteContact(id).subscribe(
        response => {
          debugger;
          this.rows = this.rows.filter(row => {
            return row.Id != id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

}
