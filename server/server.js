import http from 'node:http';
// import fs from 'node:fs'; // to read a content of a file
// import path from 'node:path'; // to access any file from a path

const PORT = 4000;
const LOCAL_IP = '192.168.1.116';

const server = http.createServer((req, res) => {
  // res.setHeader("Content-Type", "text/html");
  // res.end(`<h1>Did it Hurt?</h1>`);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    message: `This server is created for managing notes.`,
    dev: `Ahnaf Abid`
  }));
});

server.listen(PORT, LOCAL_IP, () => console.log(`Server up and running at ip: ${LOCAL_IP} on port: ${PORT}`));