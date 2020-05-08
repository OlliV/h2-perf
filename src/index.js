const convBytes = require("bytes");
const server = require("./server");
const client = require("./client");

const CLIENT_PORT = 42069;
const SERVER_PORT = 42069;
const arg = process.argv[2];

if (arg) {
  // client
  client(CLIENT_PORT, arg);
} else {
  // server
  server(SERVER_PORT);
}
