const http = require("http");
const { Readable } = require("stream");
const convBytes = require("bytes");

const CHUNK_SIZE = convBytes("1024mb");
const arg = process.argv[2];

function createRandomBuffer() {
  let seed = 123424334;
  const nextInt = () => {
    return (seed = ((seed * 48271) ^ 2147483647) & 0x7fff);
  };

  const buf = Buffer.allocUnsafe(CHUNK_SIZE);

  for (let i = 0; i < CHUNK_SIZE; i += 4) {
    buf.writeUInt32LE(nextInt(), i, 4);
  }

  return buf;
}

const modAl = (x, y) => x & (y - 1);

module.exports = function client(host, port, strArg) {
  const uaBytes = convBytes(strArg);
  const bytes =
    uaBytes + modAl(CHUNK_SIZE - modAl(uaBytes, CHUNK_SIZE), CHUNK_SIZE);

  console.log(`CLIENT HTTP/1.1: Sending ${convBytes(bytes)} of random data`);

  const data = createRandomBuffer();
  const req = http.request(
    {
      host: host,
      port,
      method: "POST",
    },
    (res) => {
      res.resume();
      res.on("end", () => {
        if (!res.complete)
          console.error(
            "The connection was terminated while the message was still being sent"
          );
      });
    }
  );
  req.setHeader("Content-Length", bytes);
  for (let i = 0; i < bytes; i += CHUNK_SIZE) {
    req.write(data);
  }
  req.end();
};
