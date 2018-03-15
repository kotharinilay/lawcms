import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';
import { CaseExpense } from '../../models/case-expense';

@Injectable()
export class CaseExpenseService {

  constructor(private httpService: HttpClientService) { }

  getCaseExpenseById(id: number) {
    return this.httpService.get('CaseExpense/GetCaseExpenseById/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getCaseExpenses() {
    return this.httpService.get('CaseExpense/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    })
  }

  addOrUpdate(caseExpenseModel: CaseExpense) {
    let url = ''
    if (caseExpenseModel.Id) {
      url = 'CaseExpense/update';
      return this.httpService.put(url, caseExpenseModel).map((res: any) => {
        if (res.Success) {
          return res.Result;
        }
        else {
          throw 'We are facing some issue with server, Plesae try after some time.';
        }

      }).catch((err: any) => {
        throw err;
      })
    } else {
      url = 'CaseExpense/create';
      return this.httpService.post(url, caseExpenseModel).map((res: any) => {
        if (res.Success) {
          return res.Result;
        }
        else {
          throw 'We are facing some issue with server, Plesae try after some time.';
        }

      }).catch((err: any) => {
        throw err;
      })
    }
  }

  deleteCaseExpense(id: number) {
    return this.httpService.delete('CaseExpense/delete/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }
}
