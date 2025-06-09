import http from 'node:http';
import { getIPAddresses } from './utils/getIpAddresses.js';
import { getDataFromDatabase } from './database/database.js';
import { sendResponse } from './utils/sendResponse.js';

const PORT = 4000;
const {wifi, ethernet} = getIPAddresses();

const server = http.createServer(async (req, res) => {
  const notes = await getDataFromDatabase();

  if(req.url === `/api` && req.method === 'GET') {
    sendResponse(res, 200, {message: "You have reacehed the destination.:\)"});
  }
  else if(req.url === `/api/user` && req.method === 'GET') {
    sendResponse(res, 200, {name: "The author himself", email: "ahnafabid.ms2@outlook.com"})
  }
  else if(req.url === `/api/user/notes` && req.method === 'GET') {
    sendResponse(res, 200, notes);
  }
  else {
    sendResponse(res, 404, {error: "Looks like you are lost. :\("})
  }
});

server.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));

// server.listen(PORT, wifi[0], () => console.log(`Server up and running at ip: ${wifi[0]} on port: ${PORT}`));
// server.listen(PORT, ethernet[0], () => console.log(`Server up and running at ip: ${ethernet[0]} on port: ${PORT}`));