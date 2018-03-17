import { Component, OnInit } from '@angular/core';
import { CaseService } from '../case.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ContactService } from '../../contact/contact.service';
import { Case } from '../../../models/case';
import { DropDownModel } from 'app/models/dropDownModel';
import { CaseType, CaseAppealType, CasePriority, WorkedAs } from 'app/shared/constants';

import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html'
})
export class CaseAddComponent implements OnInit {
  public paramId: any;
  courts: any[] = [];
  judges: any[] = [];
  offices: any[] = [];
  model: Case = new Case();
  CaseTypeDropDown: Array<DropDownModel> = CaseType;
  CaseAppealTypeDropDown: Array<DropDownModel> = CaseAppealType;
  PriorityDropDown: Array<DropDownModel> = CasePriority;
  WorkedAsDropDown: Array<DropDownModel> = WorkedAs;

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private caseService: CaseService, private _notify: NotificationService,
    private contactService: ContactService, private _sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.paramId = param["id"]);
    this.caseService.getCourtsDD().subscribe(res => {
      this.courts = res;
    }, err => {
      this._notify.error(err.Result);
    });
    this.caseService.getJudgesDD().subscribe(res => {
      this.judges = res;
    }, err => {
      this._notify.error(err.Result);
    });
    if (this.paramId.toString() != "new") {
      this.caseService.getCaseById(this.paramId).subscribe(
        response => {
          debugger;
          this.model = <Case>response;
          // if (this.model.ClientId) {
          //   this.contactService.getContactById(this.model.ClientId).subscribe(res => {

          //   })
          // }
        }, err => {
          this._notify.error(err.Result);
        });
    }
  }

  autocompleListFormatter = (data: any) => {
    let html = `<span>${data.Name} - ${data.ContactType} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  contactSearch(term: string): Observable<any[]> {
    return this.contactService.contactSearch(term);
  }

  advocateSearch(term: string) {
    return this.contactService.advocateSearch(term);
  }

  getOfficeAddresses() {
    this.contactService.getAddressByContactId(1).subscribe(res => {
      res.forEach(element => {
        if (element.AddressType === 'Office')
          this.offices.push(element);
      });
    }, err => {
      this._notify.error(err.Result);
    });
  }

  onSelectClient(item: any) {
    debugger;
    if (item) {
      this.model.ClientId = item.Id;
    } else {
      this.model.ClientId = undefined;
    }

  }

  onSelectOponent(item: any) {
    if (item) {
      this.model.OpponentContactId = item.Id;
    } else {
      this.model.OpponentContactId = undefined;
    }
  }

  onSelectOponentAdvocate(item: any) {
    if (item) {
      this.model.OppnentAdvocateId = item.Id;
    } else {
      this.model.OppnentAdvocateId = undefined;
    }
  }

  onSelectWitness(item: any) {
    if (item) {
      this.model.WitnessContactId = item.Id;
    } else {
      this.model.WitnessContactId = undefined;
    }
  }

  save() {
    debugger;
    this.isLoading = true;
    this.caseService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
        if (response) {
          if (this.paramId === 'new') {
            this._notify.success("Case added successfully.");
          }
          else {
            this._notify.success("Case updated successfully.");
          }

          setTimeout(() => {
            this.router.navigate(['/case']);
          });
        }
      }, err => {
        this._notify.error(err.Result);
      });
  }

  onCancelClick() {
    this.router.navigate(['/case']);
  }
}
