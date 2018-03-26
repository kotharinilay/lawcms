import { Injectable } from '@angular/core';
import { HttpClientService } from '../../lib/http/http-client.service';
import { ExpenseType } from '../../models/expense-type';

@Injectable()
export class ExpenseTypeService {

  constructor(private httpService: HttpClientService) { }

  getAllExpenseTypes() {
    return this.httpService.get('ExpenseType/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getExpenseById(id: number) {
    return this.httpService.get(`ExpenseType/GetExpenseTypeById/${id}`).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  addOrUpdateExpenseType(model: ExpenseType) {
    let url = '';
    if (model.Id) {
      url = 'ExpenseType/Update';
      return this.httpService.put(url, model).map((res: any) => {
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
      url = 'ExpenseType/Create';
      return this.httpService.post(url, model).map((res: any) => {
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

  deleteExpenseType(id: number) {
    return this.httpService.delete(`ExpenseType/Delete/${id}`).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

}
