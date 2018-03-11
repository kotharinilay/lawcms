import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';
import { Case } from 'app/models/case';

@Injectable()
export class CaseService {

  constructor(private httpService: HttpClientService) { }

  getCaseById(id: number) {
    return this.httpService.get('case/GetCaseById/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getCases() {
    return this.httpService.get('case/getall').map((res: any) => {
      debugger;
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    })
  }

  addOrUpdate(caseModel: Case) {
    debugger;
    let url = ''
    if (caseModel.Id) {
      url = 'case/update';
      return this.httpService.put(url, caseModel).map((res: any) => {
        debugger;
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
      url = 'case/create';
      return this.httpService.post(url, caseModel).map((res: any) => {
        debugger;
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

  deleteCase(id: number) {
    debugger;
    return this.httpService.delete('case/delete/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      debugger;
      throw err;
    });
  }
}
