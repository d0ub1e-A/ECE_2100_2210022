const validClients = ['gmail.com', 'outlook.com', 'yahoo.com'];

export function isValidMail(mail) {
  if(mail !== '') return true;
  else return false;
}

export function isValidPassword(pass) {
  if(pass.length >= 8) return true;
  else return false;
}

export function isValidName(name) {
  if(name !== '') return true;
  else return false;
}