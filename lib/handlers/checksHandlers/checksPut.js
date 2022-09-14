const _data = require("../../data");
const verify = require("../tokenHandlers/tokenVerify");

const put = function (data, callback) {
  //required data:at least one of the optional data
  //optional data:protocol, method,

  const checkData = data.payload;
  //validate the data gotten from the payload
  const checkId =
    typeof checkData.checkId == "string" && checkData.checkId.length === 20
      ? checkData.checkId
      : false;
  const protocol =
    typeof checkData.protocol == "string" &&
    ["http", "https"].indexOf(checkData.protocol) > -1
      ? checkData.protocol
      : false;
  const url =
    typeof checkData.url == "string" && checkData.url.trim().length > 0
      ? checkData.url.trim()
      : false;
  const method =
    typeof checkData.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(checkData.method) > -1
      ? checkData.method
      : false;
  const successCodes =
    typeof checkData.successCodes == "object" &&
    checkData.successCodes instanceof Array &&
    checkData.successCodes.length > 0
      ? checkData.successCodes
      : false;
  const timeoutSeconds =
    typeof checkData.timeoutSeconds == "number" &&
    checkData.timeoutSeconds % 1 === 0 &&
    checkData.timeoutSeconds >= 1 &&
    checkData.timeoutSeconds <= 5
      ? checkData.timeoutSeconds
      : false;
  if (
    checkId &&
    (protocol || method || timeoutSeconds || successCodes || url)
  ) {
    //check if the checkId is in the db
    _data.read("checks", checkId, (err, dataCheck) => {
      if (!err && dataCheck) {
        //check if the token in the header is valid
        const token =
          typeof data.headers.token == "string" &&
          data.headers.token.length === 20
            ? data.headers.token
            : false;
        //check if the token is in the db
        _data.read("tokens", token, (err, tokenData) => {
          if (!err && tokenData) {
            //check the validity of the token
            verify(dataCheck.userPhone, token, (validity) => {
              if (validity) {
                if (protocol) {
                  dataCheck.protocol = protocol;
                }
                if (url) {
                  dataCheck.url = url;
                }
                if (timeoutSeconds) {
                  dataCheck.timeoutSeconds = timeoutSeconds;
                }
                if (successCodes) {
                  dataCheck.successCodes = successCodes;
                }
                if (method) {
                  dataCheck.method = method;
                }

                _data.update("checks", checkId, dataCheck, (err) => {
                  if (!err) {
                    callback(200, { message: "check successfuly updated" });
                  } else {
                    callback(500, "error occured when updating check");
                  }
                });
              } else {
                callback(403, {
                  err: "you are not authorized to update this users data",
                });
              }
            });
          } else {
            callback(400, { err: "token passed in header is not valid" });
          }
        });
      } else {
        callback(404, { err: "check does not exist" });
      }
    });
  } else {
    callback(400, {
      error: "pass in at least one field or checkId provided is in valid",
    });
  }
};

module.exports = put;
