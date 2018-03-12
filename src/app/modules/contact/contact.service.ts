import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';
import { Contact, Address } from 'app/models/contact';

@Injectable()
export class ContactService {

  constructor(private httpService: HttpClientService) { }

  getContactById(id: number) {
    return this.httpService.get('contact/GetContactById/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getAddressByContactId(contactId: number) {
    return this.httpService.get('address/GetAddresssByContactId?contactId=' + contactId).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err.detail;
    });
  }

  getContacts() {
    return this.httpService.get('contact/getall').map((res: any) => {
      debugger;
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      throw err;
    })
  }

  addOrUpdate(contactModel: Contact) {
    debugger;
    let url = ''
    if (contactModel.Id) {
      url = 'contact/update';
      return this.httpService.put(url, contactModel).map((res: any) => {
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
      url = 'contact/create';
      return this.httpService.post(url, contactModel).map((res: any) => {
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

  addOrUpdateAddress(addressModel: Address) {
    debugger;
    let url = ''
    if (addressModel.Id) {
      url = 'address/update';
      return this.httpService.put(url, addressModel).map((res: any) => {
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
      url = 'address/create';
      return this.httpService.post(url, addressModel).map((res: any) => {
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

  deleteContact(id: number) {
    debugger;
    return this.httpService.delete('contact/delete/' + id).map((res: any) => {
      if (res.Success) {
        return res.Result;
      }
      throw 'We are facing some issue with server, Plesae try after some time.';
    }).catch((err: any) => {
      debugger;
      throw err;
    });
  }

  deleteAddress(id: number) {
    debugger;
    return this.httpService.delete('address/delete/' + id).map((res: any) => {
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
