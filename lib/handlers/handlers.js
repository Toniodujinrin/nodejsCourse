//import modules
const userHandlers = require("./userHanlders");
const tokenHandlers = require("./tokenHandlers");
const _data = require("../data");
const checksHandlers = require("./checksHandlers");

//define handlers
const handlers = {};

//ping handler
handlers.ping = function (data, callback) {
  callback(200);
};

//not found handler
handlers.notFound = function (data, callback) {
  callback(406);
};

handlers.users = function (data, callback) {
  const acceptabeMethods = ["get", "post", "put", "delete"];
  if (acceptabeMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers._users = {};
handlers._users.post = function (data, callback) {
  userHandlers.post(data, callback);
};

handlers._users.get = function (data, callback) {
  userHandlers.get(data, callback);
};

handlers._users.delete = function (data, callback) {
  userHandlers.Delete(data, callback);
};

handlers._users.put = function (data, callback) {
  userHandlers.put(data, callback);
};

handlers.tokens = function (data, callback) {
  const acceptedMethods = ["put", "get", "post", "delete"];
  //check if accepted method math method passed in data object from browser
  if (acceptedMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else callback(405, { error: "unauthorized method" });
};

handlers._tokens = {};

handlers._tokens.delete = function (data, callback) {
  tokenHandlers.delete(data, callback);
};

handlers._tokens.post = function (data, callback) {
  tokenHandlers.post(data, callback);
};
handlers._tokens.get = function (data, callback) {
  tokenHandlers.get(data, callback);
};
handlers._tokens.put = function (data, callback) {
  tokenHandlers.put(data, callback);
};

handlers._tokens.verify = function (phone, tokenId, callback) {
  tokenHandlers.verify(phone, tokenId, callback);
};

handlers.checks = function (data, callback) {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405, { error: "unauthorized method was passed" });
  }
};

handlers._checks = {};
handlers._checks.post = function (data, callback) {
  checksHandlers.post(data, callback);
};
handlers._checks.get = function (data, callback) {
  checksHandlers.get(data, callback);
};
handlers._checks.put = function (data, callback) {
  checksHandlers.put(data, callback);
};
handlers._checks.delete = function (data, callback) {
  checksHandlers.delete(data, callback);
};

module.exports = handlers;
