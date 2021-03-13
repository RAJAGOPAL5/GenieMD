export const languages = [{ name: 'English', id: 1 },
{ name: 'Spanish', id: 2 },
{ name: 'Chinese', id: 3 },
{ name: 'Japanese', id: 4 },
{ name: 'Russian', id: 5 },
{ name: 'Portuguese', id: 6 },
{ name: 'French', id: 7 },
{ name: 'Italian', id: 8 },
{ name: 'Arabic', id: 9 },
{ name: 'German', id: 10 },
{ name: 'Korean', id: 11 }
];

export const states = [{ name: 'Alabama', abbreviation: 'AL' },
{ name: 'Alaska', abbreviation: 'AK' },
{ name: 'Arizona', abbreviation: 'AZ' },
{ name: 'Arkansas', abbreviation: 'AR' },
{ name: 'California', abbreviation: 'CA' },
{ name: 'Colorado', abbreviation: 'CO' },
{ name: 'Connecticut', abbreviation: 'CT' },
{ name: 'District Of Columbia', abbreviation: 'DC' },
{ name: 'Delaware', abbreviation: 'DE' },
{ name: 'Florida', abbreviation: 'FL' },
{ name: 'Georgia', abbreviation: 'GA' },
{ name: 'Hawaii', abbreviation: 'HI' },
{ name: 'Idaho', abbreviation: 'ID' },
{ name: 'Illinois', abbreviation: 'IL' },
{ name: 'Indiana', abbreviation: 'IN' },
{ name: 'Iowa', abbreviation: 'IA' },
{ name: 'Kansas', abbreviation: 'KS' },
{ name: 'Kentucky', abbreviation: 'KY' },
{ name: 'Louisiana', abbreviation: 'LA' },
{ name: 'Maine', abbreviation: 'ME' },
{ name: 'Marshall Islands', abbreviation: 'MH' },
{ name: 'Maryland', abbreviation: 'MD' },
{ name: 'Massachusetts', abbreviation: 'MA' },
{ name: 'Michigan', abbreviation: 'MI' },
{ name: 'Minnesota', abbreviation: 'MN' },
{ name: 'Mississippi', abbreviation: 'MS' },
{ name: 'Missouri', abbreviation: 'MO' },
{ name: 'Montana', abbreviation: 'MT' },
{ name: 'Nebraska', abbreviation: 'NE' },
{ name: 'Nevada', abbreviation: 'NV' },
{ name: 'New Hampshire', abbreviation: 'NH' },
{ name: 'New Jersey', abbreviation: 'NJ' },
{ name: 'New Mexico', abbreviation: 'NM' },
{ name: 'New York', abbreviation: 'NY' },
{ name: 'North Carolina', abbreviation: 'NC' },
{ name: 'North Dakota', abbreviation: 'ND' },
{ name: 'Northern Mariana Islands', abbreviation: 'MP' },
{ name: 'Ohio', abbreviation: 'OH' },
{ name: 'Oklahoma', abbreviation: 'OK' },
{ name: 'Oregon', abbreviation: 'OR' },
{ name: 'Palau', abbreviation: 'PW' },
{ name: 'Pennsylvania', abbreviation: 'PA' },
{ name: 'Puerto Rico', abbreviation: 'PR' },
{ name: 'Rhode Island', abbreviation: 'RI' },
{ name: 'South Carolina', abbreviation: 'SC' },
{ name: 'South Dakota', abbreviation: 'SD' },
{ name: 'Tennessee', abbreviation: 'TN' },
{ name: 'Texas', abbreviation: 'TX' },
{ name: 'Utah', abbreviation: 'UT' },
{ name: 'Vermont', abbreviation: 'VT' },
{ name: 'Virgin Islands', abbreviation: 'VI' },
{ name: 'Virginia', abbreviation: 'VA' },
{ name: 'Washington', abbreviation: 'WA' },
{ name: 'West Virginia', abbreviation: 'WV' },
{ name: 'Wisconsin', abbreviation: 'WI' },
{ name: 'Wyoming', abbreviation: 'WY' }
];

export const morbidity = [{ name: 'Lung Disease', id: 0 }, { name: 'Heart Disease', id: 1 }];

export const gender = [{ id: 'Male', value: 0 },
{ id: 'Female', value: 1 },
{ id: 'Other', value: 2 }];

export const vitals = [
    { id: 1, name: 'BP', displayName: 'BP', vitalType: 1, min: 60, max: 200 },
    { id: 2, name: 'SpO2', displayName: 'SpO2', vitalType: 13, min: 10, max: 100 },
    { id: 3, name: 'Glucose', displayName: 'GLC', vitalType: 2, min: 100, max: 200  },
    { id: 4, name: 'Weight', displayName: 'Wt', vitalType: 6,  min: 50, max: 200  },
    { id: 5, name: 'Temperature', displayName: 'Temp', vitalType: 14,  min: -20, max: 80  }];

export const diseaseState = [
    {id: 1, name: 'Hypertension'},
    {id: 2, name: 'High Cholesterol'},
    {id: 3, name: 'Heart Disease'},
    {id: 4, name: 'Diabetes'},
    {id: 5, name: 'Kidney Disease'},
    {id: 6, name: 'Heart Failure'},
    {id: 7, name: 'Pulmonary Disease'},
    {id: 8, name: 'Cancer'},
    {id: 9, name: 'Mental Health'},
    {id: 10, name: 'Other'}
];

export const relation = [
    { id: 0, value: 'Father' },
    { id: 1, value: 'Mother' },
    { id: 2, value: 'Spouse' },
    { id: 3, value: 'Brother' },
    { id: 4, value: 'Sister' },
    { id: 5, value: 'Other' }];
export const preferredLanguage = [
    { name: 'English', id: 1 },
    { name: 'Spanish', id: 2 },
    { name: 'Chinese', id: 3 },
    { name: 'Tagalog', id: 4 },
    { name: 'Vietnamese', id: 5 },
    { name: 'Other', id: 6 },
];
export const deviceTypes = [
    { id: 1, name: 'Thermometer', type: 'Thermometer', model: 'PT3SBT', manufacturer: 'iHealth' },
    { id: 2, name: 'iHealth Scales', type: 'Scale', model: 'HS2S', manufacturer: 'iHealth' },
    { id: 3, name: 'iHealth Blood Pressure', type: 'Blood Pressure Monitor', model: 'KN-550BT', manufacturer: 'iHealth' },
    { id: 4, name: 'iHealth Pulse Oximeter', type: 'Pulse Oximeter', model: 'PO3', manufacturer: 'iHealth' },
    { id: 5, name: 'iHealth Glucose Meter', type: 'Glucose Meter', model: 'BG5s', manufacturer: 'iHealth' },
];
