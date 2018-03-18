export class Contact {
    Id: number;
    Title: string;
    FirstName: string;
    LastName: string;
    ContactType: string;
    CompanyName: string;
    Website: string;
    IsActive: boolean;
    UpdatedTime: Date;
    Address: Address[];
    MobileNumbers: Mobile[];
    EmailAddress: Email[];
}

export class Address {
    Id: number;
    Address1: string;
    State: string;
    City: string;
    PostCode: string;
    AddressType: string;
    IsPrimary: boolean;
    ContactId: number;
}

export class Mobile {
    Id: number;
    MobileNumber: string;
    IsPrimary: string;
    ContactId: number;
}

export class Email {
    Id: number;
    EmailId: string;
    IsPrimary: string;
    ContactId: number;
}