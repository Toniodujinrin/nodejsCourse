const config = require("../../config");
const helpers = require("../../helpers");
const _data = require("../../data");

const post = function (data, callback) {
  //required info: protocol, url , method , success codes , timeoutSeconds
  //Validate all data fields
  const checkData = data.payload;
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

  if (protocol && url && successCodes && timeoutSeconds && method) {
    //ensure that only validatd users can make checks by checking the tokens
    const token =
      typeof data.headers.token == "string" && data.headers.token.length == 20
        ? data.headers.token
        : false;
    if (token) {
      //check if the token is valid and exists
      _data.read("tokens", token, (err, data) => {
        if (!err && data) {
          const userPhone = data.phone;

          //lookup the user in the db
          _data.read("users", userPhone, (err, userData) => {
            if (!err && userData) {
              const userChecks =
                typeof userData.checks == "object" &&
                userData.checks instanceof Array
                  ? userData.checks
                  : [];
              //check if the maximimum number of checks has been exeded
              if (userChecks.length < config.maxChecks) {
                var checkId = helpers.createRandomString(20);
                //create the check object and include the numbers phone also include the check id in the users object
                const checkObject = {};
                checkObject.id = checkId;
                checkObject.userPhone = userPhone;
                checkObject.protocol = protocol;
                checkObject.url = url;
                checkObject.method = method;
                checkObject.successCodes = successCodes;
                checkObject.timeoutSeconds = timeoutSeconds;
                //save the object

                _data.create("checks", checkId, checkObject, (err) => {
                  if (!err) {
                    userData.checks = userChecks;
                    userData.checks.push(checkId);
                    _data.update("users", userPhone, userData, (err) => {
                      if (!err) {
                        callback(200, {
                          message:
                            "check successfuly created and the user has been updated with the check" +
                            checkObject,
                        });
                      } else {
                        callback(500, {
                          error:
                            "could not pass update the user with the check",
                        });
                      }
                    });
                  } else {
                    callback(500, {
                      err: "error occured whil creating the check",
                    });
                  }
                });
              } else {
                callback(403, {
                  error: "user has exeeded maximum anount of checks",
                });
              }
            } else {
              callback(403, {
                error:
                  "the token provided does not match any of the users in the db",
              });
            }
          });
        } else {
          callback(403, { err: "token passed in header does not exist" });
        }
      });
    } else {
      400, { error: "token passed in header is not valid" };
    }
  } else {
    callback(400, {
      error:
        "fields provided are invalid" +
        successCodes +
        method +
        protocol +
        url +
        timeoutSeconds,
    });
  }
};

module.exports = post;
