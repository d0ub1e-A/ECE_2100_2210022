import http from 'node:http';

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    message: `This server is created for managing notes.`,
    dev: `Ahnaf Abid`
  }));
});

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));