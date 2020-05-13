const { PerformanceObserver } = require("perf_hooks");
const http = require("http");

module.exports = function server(port) {
  console.log("SERVER HTTP/1.1");

  let bytesRead = 0;
  const obs = new PerformanceObserver((items) => {
    const entry = items.getEntries()[0];

    if (entry.name === "HttpRequest") {
      entry.speedGbps =
        (8 * (bytesRead / (entry.duration / 1000))) / 1000 / 1000 / 1000;

      console.log(entry);
    }
  });

  obs.observe({ entryTypes: ["http"] });

  const server = http.createServer((req, res) => {
    req.on("data", (d) => (bytesRead += d.length));
    req.on("end", () => {
      res.writeHead(200);
      res.end();
    });
  });

  server.on("error", (err) => console.error(err));
  server.on("clientError", (err, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });

  server.listen(port);
};
