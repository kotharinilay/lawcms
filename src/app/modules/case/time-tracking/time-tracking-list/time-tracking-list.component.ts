import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/modules/case/case.service';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.component.html',
  styleUrls: ['./time-tracking-list.component.css']
})
export class TimeTrackingListComponent implements OnInit {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  CaseId: number;

  constructor(private route: ActivatedRoute, private caseService: CaseService,
    private router: Router,
    private _notify: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.CaseId = param['caseId']);
    this.caseService.getTimeTrackingByCaseId(this.CaseId).subscribe(
      response => {
        this.rows = response;
        setTimeout(() => { this.loadingIndicator = false; });
      }, err => {
        this._notify.error(err.Result);
      });
  }

  editClick(id) {
    this.router.navigateByUrl(`/case/${this.CaseId}/time-tracking/${id}`);
  }

  deleteClick(id) {
    if (confirm('Are you sure you want to delete this task time tracking?')) {
      this.caseService.deleteTaskTimeTracking(id).subscribe(
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
