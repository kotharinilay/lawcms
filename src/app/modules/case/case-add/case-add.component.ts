import { Component, OnInit } from '@angular/core';
import { CaseService } from '../case.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ContactService } from '../../contact/contact.service';
import { Case } from '../../../models/case';
import { DropDownModel } from 'app/models/dropDownModel';
import { CaseType, CaseAppealType, CasePriority } from 'app/shared/constants';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html'
})
export class CaseAddComponent implements OnInit {
  courts: any[] = [];
  judges: any[] = [];
  contacts: any[] = [];
  advocates: any[] = [];
  model: Case = new Case();
  CaseTypeDropDown: Array<DropDownModel> = CaseType;
  CaseAppealTypeDropDown: Array<DropDownModel> = CaseAppealType;
  PriorityDropDown: Array<DropDownModel> = CasePriority;

  constructor(private caseService: CaseService, private _notify: NotificationService,
    private contactService: ContactService) { }

  ngOnInit() {
    this.caseService.getCourtsDD().subscribe(res => {
      this.courts = res;
    }, err => {
      this._notify.error(err.Result);
    });
    this.caseService.getCourtsDD().subscribe(res => {
      this.judges = res;
    }, err => {
      this._notify.error(err.Result);
    })
  }

  contactSearch(term: string) {
    this.contactService.contactSearch(term).subscribe(res => {
      this.contacts = res;
    }, err => {
      this._notify.error(err.Result);
    });
  }

  advocateSearch(term: string) {
    this.contactService.advocateSearch(term).subscribe(res => {
      this.advocates = res;
    }, err => {
      this._notify.error(err.Result);
    });
  }

  onSelectClient(item: any) {
    debugger;
    this.model.ClientId = item;
    this.contacts = [];
  }

  onSelectOponent(item: any) {
    this.model.OpponentContactId = item;
    this.contacts = [];
  }

  onSelectOponentAdvocate(item: any) {
    this.model.OppnentAdvocateId = item;
    this.advocates = [];
  }

  onSelectWitness(item: any) {
    this.model.WitnessContactId = item;
    this.contacts = [];
  }
}
