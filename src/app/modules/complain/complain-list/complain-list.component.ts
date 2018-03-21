import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { ComplainService } from 'app/modules/complain/complain.service';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html'
})
export class ComplainListComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  constructor(private complainService: ComplainService,
    private router: Router,
    private _notify: NotificationService) { }

  ngOnInit() {
    this.complainService.getComplains().subscribe(
      response => {
        this.rows = response;
        setTimeout(() => { this.loadingIndicator = false; });
      }, err => {
        this._notify.error(err.Result);
      });
  }

  editClick(id) {
    this.router.navigateByUrl('/complain/' + id);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete complain?')) {
      this.complainService.deleteComplain(id).subscribe(
        response => {
          this.rows = this.rows.filter(row => {
            return row.Id !== id;
          });
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }
}
