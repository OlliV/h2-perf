const { PerformanceObserver } = require("perf_hooks");
const http2 = require("http2");
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

module.exports = function client(port, strArg) {
  const uaBytes = convBytes(strArg);
  const bytes =
    uaBytes + modAl(CHUNK_SIZE - modAl(uaBytes, CHUNK_SIZE), CHUNK_SIZE);

  console.log(`CLIENT: Sending ${convBytes(bytes)} of random data`);

  const data = createRandomBuffer();
  const client = http2.connect(`http://127.0.0.1:${port}`);
  client.on("error", (err) => console.error(err));

  const req = client.request(
    {
      [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
      [http2.constants.HTTP2_HEADER_AUTHORITY]: "prv",
      ":path": "/trash",
      "Content-Length": bytes,
    },
    {
      exclusive: true,
    }
  );
  //req.session.settings({
  //  maxFrameSize: 16777215,
  //});

  for (let i = 0; i < bytes; i += CHUNK_SIZE) {
    req.write(data);
  }
  req.end();

  req.on("response", (headers, flags) => {
    for (const name in headers) {
      console.log(`${name}: ${headers[name]}`);
    }
  });

  req.on("end", () => {
    client.close();
  });
};
