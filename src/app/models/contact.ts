export class Contact {
    Id: number;
    Title: string;
    FirstName: string;
    LastName: string;
    ContactType: string;
    CompanyId: number;
    IsImportant: boolean;
    Reference: string;
    DealOn: string;
    PriceRate: number;
    BasePrice: number;
    IsActive: boolean;
    UpdatedTime: Date;
    Address: Address[];
    MobileNumbers: Mobile[];
    EmailAddress: Email[];
}

export class Address {
    Id: number;
    Address1: string;
    State: number;
    CountryId: number;
    CityId: string;
    PostCode: string;
    AddressType: string;
    IsPrimary: boolean;
    IsActive: boolean;
    UpdatedTime?: string;
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