import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';
import { Case, CaseStatus } from 'app/models/case';

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
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    })
  }

  addOrUpdate(caseModel: Case) {
    let url = ''
    if (caseModel.Id) {
      url = 'case/update';
      return this.httpService.put(url, caseModel).map((res: any) => {
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
    return this.httpService.delete('case/delete/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

  getCourtsDD() {
    return this.httpService.get('Court/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    })
  }

  getJudgesDD() {
    return this.httpService.get('Judge/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

  getCaseAppealTypes() {
    return this.httpService.get('AppealType/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

  getStages() {
    return this.httpService.get('Stage/GetAll').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

  addOrUpdateStatus(statusModel: CaseStatus) {
    let url = ''
    if (statusModel.Id) {
      url = 'CaseStatus/update';
      return this.httpService.put(url, statusModel).map((res: any) => {
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
      url = 'CaseStatus/create';
      return this.httpService.post(url, statusModel).map((res: any) => {
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
}
