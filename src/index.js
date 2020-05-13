const convBytes = require("bytes");
const serverH11 = require("./http11-server");
const serverH2 = require("./http2-server");
const clientH11 = require("./http11-client");
const clientH2 = require("./http2-client");

const CLIENT_HOST = "127.0.0.1";
const CLIENT_PORT = 42069;
const SERVER_PORT = 42069;
const arg = process.argv[2];

const enH1 = process.env.HTTP === "1";
const client = enH1 ? clientH11 : clientH2;
const server = enH1 ? serverH11 : serverH2;

if (arg) {
  // client
  client(CLIENT_HOST, CLIENT_PORT, arg);
} else {
  // server
  server(SERVER_PORT);
}
