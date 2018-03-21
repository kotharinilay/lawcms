import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';
import { Complain } from 'app/models/complain';

@Injectable()
export class ComplainService {

  constructor(private httpService: HttpClientService) { }

  getComplainById(id: number) {
    return this.httpService.get('complain/GetComplainById/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getComplains() {
    return this.httpService.get('complain/getall').map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

  addOrUpdate(complain: Complain) {
    let url = '';
    if (complain.Id) {
      url = 'complain/update';
      return this.httpService.put(url, complain).map((res: any) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw 'We are facing some issue with server, Plesae try after some time.';
        }
      }).catch((err: any) => {
        throw err;
      });
    } else {
      url = 'complain/create';
      return this.httpService.post(url, complain).map((res: any) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw 'We are facing some issue with server, Plesae try after some time.';
        }
      }).catch((err: any) => {
        throw err;
      });
    }
  }

  deleteComplain(id: number) {
    return this.httpService.delete('complain/delete/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    });
  }

}
