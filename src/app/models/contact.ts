export class Contact {
    Id: number;
    Title: string;
    FirstName: string;
    LastName: string;
    ContactType: string;
    MobileNumber: string;
    EmailId: string;
    CompanyName: string;
    Website: string;
    IsActive: boolean;
    UpdatedTime: Date;
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