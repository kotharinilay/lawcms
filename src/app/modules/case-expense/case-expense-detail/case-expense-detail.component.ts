import { Component, OnInit } from '@angular/core';
import { CaseExpense } from '../../../models/case-expense';
import { DropDownModel } from 'app/models/dropDownModel';
import { ExpenseCategory } from '../../../shared/constants';
import { Observable } from 'rxjs';
import { ContactService } from 'app/modules/contact/contact.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseExpenseService } from '../case-expense.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { CaseService } from '../../case/case.service';

@Component({
  selector: 'app-case-expense-detail',
  templateUrl: './case-expense-detail.component.html'
})
export class CaseExpenseDetailComponent implements OnInit {
  public paramId: any;
  model: CaseExpense = new CaseExpense();
  cases: any[] = [];
  CategoryDropDown: Array<DropDownModel> = ExpenseCategory;

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private caseExpenseService: CaseExpenseService, private _notify: NotificationService,
    private _sanitizer: DomSanitizer, private contactService: ContactService, private caseService: CaseService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.paramId = param["id"]);
    this.caseService.getCases().subscribe(res => {
      this.cases = res;
    }, err => {
      this._notify.error(err.Result);
    });
    if (this.paramId.toString() != "new") {
      this.caseExpenseService.getCaseExpenseById(this.paramId).subscribe(
        response => {
          debugger;
          this.model = <CaseExpense>response;
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

  onSelectContact(item: any) {
    debugger;
    if (item) {
      this.model.AssociateContactId = item.Id;
    } else {
      this.model.AssociateContactId = undefined;
    }
  }

  save() {
    debugger;
    this.isLoading = true;
    this.caseExpenseService.addOrUpdate(this.model).subscribe(
      response => {
        this.isLoading = false;
        if (response) {
          if (this.paramId === 'new') {
            this._notify.success("Case Expense added successfully.");
          }
          else {
            this._notify.success("Case Expense updated successfully.");
          }

          setTimeout(() => {
            this.router.navigate(['/case-expense']);
          });
        }
      }, err => {
        this._notify.error(err.Result);
      });
  }
}
