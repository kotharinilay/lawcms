export const httpResponseTypes = {
    BLOB: 'blob',
    JSON: 'json',
    TEXT: 'text',
    ARRAYBUFFER: 'arraybuffer'
};

export const httpObserves = {
    RESPONSE: 'response',
    EVENT: 'event',
    BODY: 'body'
};

export const ContactType = [
    { Id: "Client", Name: "Client" },
    { Id: "Advocate", Name: "Advocate" },
    { Id: "Contact", Name: "Contact" },
    { Id: "Company", Name: "Company" },
    { Id: "Witness", Name: "Witness" },
    { Id: "Opponent", Name: "Opponent" },
    { Id: "Associates", Name: "Associates" }
];

export const AddressType = {
    Home: 'Home',
    Office: 'Office'
};

export const contactDashboardTab = {
    0: 'NewlyAdded',
    1: 'Client',
    2: 'Advocate',
    3: 'LawFirm',
    4: 'Other'
};

export const CaseType = [
    { Id: "General", Name: "General" },
    { Id: "Litigation", Name: "Litigation" }
];

export const CaseAppealType = [
    { Id: "Business", Name: "Corporate / Business" },
    { Id: "IP", Name: "Intellectual Property (IP)" },
    { Id: "IT", Name: "Information Technology" },
    { Id: "CLB", Name: "Company / CLB" },
    { Id: "Securities", Name: "Securities" },
    { Id: "Media", Name: "Media and Entertainment" },
    { Id: "Family", Name: "Family" },
    { Id: "Criminal", Name: "Criminal" },
    { Id: "Civil", Name: "Civil" },
    { Id: "Construction", Name: "Real Estate/Construction" },
    { Id: "Environmental", Name: "Environmental" },
    { Id: "Immigration", Name: "Immigration " },
    { Id: "Insurance", Name: "Insurance" },
    { Id: "International", Name: "International" },
    { Id: "Labour", Name: "Labour" },
    { Id: "Constitutional", Name: "Constitutional" },
    { Id: "Antitrust", Name: "Antitrust" },
    { Id: "Aviation", Name: "Aviation" }
];

export const CasePriority = [
    { Id: "Low", Name: "Low" },
    { Id: "Normal", Name: "Normal" },
    { Id: "High", Name: "High" }
];

export const WorkedAs = [
    { Id: "Associate", Name: "Associate" },
    { Id: "Referral", Name: "Referral" },
    { Id: "Consultant", Name: "Consultant" },
    { Id: "FirstMeeting", Name: "First meeting" }
];

export const ExpenseCategory = [
    { Id: "Copying", Name: "Copying" },
    { Id: "Printing", Name: "Printing" },
    { Id: "Documentation", Name: "Documentation" },
    { Id: "Phone Call", Name: "Phone Call" },
    { Id: "Research", Name: "Research" },
    { Id: "Delivery", Name: "Delivery" },
    { Id: "Services", Name: "Services" },
    { Id: "Postage", Name: "Postage" },
    { Id: "Courier", Name: "Courier" },
    { Id: "Local Travel", Name: "Local Travel" },
    { Id: "Out of town travel", Name: "Out of town travel" },
    { Id: "Meals", Name: "Meals" },
    { Id: "Court Fees", Name: "Court Fees" },
    { Id: "Witness Summons Fees", Name: "Witness Summons Fees" },
    { Id: "Witness Fees", Name: "Witness Fees" },
    { Id: "Deposition Transcripts", Name: "Deposition Transcripts" },
    { Id: "Trial Transcripts", Name: "Trial Transcripts" },
    { Id: "Trial Exhibits", Name: "Trial Exhibits" },
    { Id: "Litigation Support Vendors", Name: "Litigation Support Vendors" },
    { Id: "Experts", Name: "Experts" },
    { Id: "Private Ivestigators", Name: "Private Ivestigators" },
    { Id: "Informer", Name: "Informer" },
    { Id: "Mediators", Name: "Mediators" },
    { Id: "Other Professionals", Name: "Other Professionals" },
    { Id: "Local Advisory", Name: "Local Advisory" },
    { Id: "Other", Name: "Other" }
];

export const DealOn = [
    { Id: "Crime", Name: "Crime" },
    { Id: "Civil", Name: "Civil" },
    { Id: "Family", Name: "Family" },
    { Id: "Forgery", Name: "Forgery" }
]