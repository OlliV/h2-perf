const { PerformanceObserver } = require("perf_hooks");
const http2 = require("http2");
const { Readable } = require("stream");
const convBytes = require("bytes");

function dummy() {}

module.exports = function server(port) {
  console.log("SERVER");
  const server = http2.createServer({
    settings: {
      maxFrameSize: 16777215,
    },
  });

  server.on("error", (err) => console.error(err));

  server.on("stream", (stream, headers) => {
    stream.on("data", (d) => {});

    stream.on("end", () => {
      stream.respond({
        ":status": 200,
      });
      stream.end();
    });
  });

  server.listen(port);

  const obs = new PerformanceObserver((items) => {
    const entry = items.getEntries()[0];

    if (entry.name === "Http2Stream") {
      entry.speedGbps =
        (8 * (entry.bytesRead / (entry.duration / 1000))) / 1000 / 1000 / 1000;

      console.log(entry);
    }
  });
  obs.observe({ entryTypes: ["http2"] });
};
