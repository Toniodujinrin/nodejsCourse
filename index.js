/*
-primary file for the API
-
-
*/

const http = require("http");
const https = require("https");
const StringDecoder = require("string_decoder").StringDecoder;
var url = require("url");
const config = require("./lib/config");
const lib = require("./lib/data");
const fs = require("fs");
const handlers = require("./lib/handlers/handlers");
const helpers = require("./lib/helpers");

//Instantiate http Server
const httpserver = http.createServer((req, res) => {
  unifiedServer(req, res);
});

//start http server

httpserver.listen(config.httpPort, () => {
  console.log(`server listening on port ${config.httpPort}`);
});

//instantiate https server

//define https options
const cert = fs.readFileSync("./https/cert.pe");
const key = fs.readFileSync("./https/key.pem");
const httpServerOptions = {
  key: key,
  cert: cert,
};

const httpsServer = https.createServer(httpServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpsServer.listen(3005, () => {
  console.log(`server is listening on port ${config.httpsPort}`);
});
//defining routes
const routes = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  checks: handlers.checks,
};

const unifiedServer = function (req, res) {
  //Get the url and parse it
  // Get the path from the url
  //Send the response
  //Log the request

  const parsedUrl = url.parse(req.url, true);
  //get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  //get http method
  const method = req.method.toLowerCase();
  //get query string as an object
  const queryStringObject = parsedUrl.query;
  //get headers as an object
  const headers = req.headers;
  //get payload,if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();

    //parse Json to object in buffer
    const parsedJsonObject = helpers.parseJsonToObject(buffer);

    //choose the handler the request should go to. If one is not found then go to the 404 page
    const data = {
      trimmedPath: trimmedPath,
      queryString: queryStringObject,
      payload: parsedJsonObject,
      method: method,
      headers: headers,
    };
    const chosenHandler =
      typeof routes[trimmedPath] != "undefined"
        ? routes[trimmedPath]
        : handlers.notFound;

    chosenHandler(data, (statusCode, payload) => {
      //Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      //use the payload called back be the handler or default to an empty object
      payload = typeof payload == "object" ? payload : {};
      //convert payload to a string
      const payloadString = JSON.stringify(payload);
      //return response to the browser via res object
      res.setHeader("Content-type", "application/json");
      res.writeHead(statusCode);
      res.write(payloadString);
      res.end();
      //log response path to the console
      console.log("retuerning this response:", statusCode, payloadString);
    });
  });
};
