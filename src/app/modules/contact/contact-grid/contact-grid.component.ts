import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { ContactService } from 'app/modules/contact/contact.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html'
})
export class ContactGridComponent implements OnInit {
  @Input() data: any[];
  @Input() showAction: boolean;

  _data: any[];

  constructor(private contactService: ContactService, private router: Router, private _notify: NotificationService) { }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;
    this._data = data.currentValue;
  }

  ngOnInit() {
  }

  editClick(id) {
    this.router.navigateByUrl('/contact/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete contact?')) {
      this.contactService.deleteContact(id).subscribe(
        response => {
          this._data = this.data.filter(row => {
            return row.Id != id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

}
