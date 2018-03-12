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
}

export const contactDashboardTab = {
    0: 'NewlyAdded',
    1: 'Client',
    2: 'Advocate',
    3: 'LawFirm',
    4: 'Other'
}