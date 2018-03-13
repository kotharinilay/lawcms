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