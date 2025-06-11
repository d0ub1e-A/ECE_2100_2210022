const validClients = ['gmail.com', 'outlook.com', 'yahoo.com'];

export const isValidMail = mail => mail !== '' ? true : false;

export const isValidPassword = pass => pass.length >= 8 ? true : false;

export const isValidName = name => name !== '' ? true : false;
