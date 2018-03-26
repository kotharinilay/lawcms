export class Case {
    Id: number;
    CaseNo: string;
    ClientId: number;
    CaseType: string;
    CaseYear: number;
    CaseAppealType: number;
    City: string;
    CourtId: number;
    Description: string;
    AppearedFor: string;
    OpponentContactId: number;
    OppnentAdvocateId: number;
    WitnessContactId: number;
    OpenDate: Date;
    EndDate: Date;
    Priority: string;
    WorkedAs: string;
    CaseStatus: string;
    OfficeAddressId: number;
    RefferenceNumber: string;
    IsActive: boolean;
    UpdateTime: Date;
    IsClose: boolean;
    CloseDate: Date;
    JugmentFavourTo: number;
    FilledDate: Date;
    NotifyMe: boolean;
    NotifyMeWhen: string;
    NotifyMeValue: number;
    AdvanceFees: number;
    PricingType: string;
    CourtFees: number;
    BillingFrequency: string;
    BillingDate: Date;
    TrustAccount: number;
    JudgeIds: number[];
}

export class CaseStatus {
    Id: number;
    CaseId: number;
    StageID: number;
    CourtId: number;
    HearingDate: Date;
    NextDate: Date;
    Description: string;
    DefendantRemark: string;
    NextActivity: string;
    Attachment: string;
    IsActive: boolean;
    UpdatedTime: Date;
}

export class CaseCommunication {
    Id: number;
    CaseId: number;
    CommunicateDate: Date;
    CommunicationType: string;
    CommunicateTo: number;
    CommunicateFrom: number;
    Summary: string;
    CommunicationDetails: string;
    IsActive: boolean;
    UpdatedTime: Date;
}

export class TimeTracking {
    Id: number;
    CaseId: number;
    AssociateId: number
    TaskDate: string;
    TaskCategory: number;
    WorkedHours: number;
    BilledHours: number;
    Rate: number;
    Details: string;
    DontBill: boolean;
    TaskCategoryName: string;
    ContactName: string
}

export class CaseNote {
    Id: number;
    NotesBy: number;
    Subject: Date;
    Description: string;
    NoteDate: Date;
    CaseId: number;
    IsActive: boolean;
    UpdatedDate: Date;
    IsImportant: boolean;
}