const post = require("./checksHandlers/checksPost");
const get = require("./checksHandlers/checksGet");
const put = require("./checksHandlers/checksPut");
const Delete = require("./checksHandlers/checksDelete");
const checksHandlers = {};
checksHandlers.post = post;
checksHandlers.get = get;
checksHandlers.put = put;
checksHandlers.delete = Delete;

module.exports = checksHandlers;
