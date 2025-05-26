import http from 'node:http';
import { getIPAddresses } from './utils/getIpAddresses.js';

const PORT = 4000;
const {wifi, ethernet} = getIPAddresses();

const server = http.createServer((req, res) => {
  // res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Type", "text/html");
  res.write(`<h1 style="text-align: center; padding: 10px 0; border: 5px solid red;">Isn't it a nice header?</h1>`)
  res.end();
});

server.listen(PORT, wifi[0], () => console.log(`Server up and running at ip: ${wifi[0]} on port: ${PORT}`));
// server.listen(PORT, ethernet[0], () => console.log(`Server up and running at ip: ${ethernet[0]} on port: ${PORT}`));