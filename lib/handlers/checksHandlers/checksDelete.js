const verify = require("../tokenHandlers/tokenVerify");
const _data = require("../../data");

const Delete = function (data, callback) {
  //required data: check Id
  const checkData = data.queryString;
  const checkId =
    typeof checkData.checkId == "string" && checkData.checkId.length === 20
      ? checkData.checkId
      : false;
  const token =
    typeof data.headers.token == "string" && data.headers.token.length === 20
      ? data.headers.token
      : false;
  if (checkId && token) {
    //check if the check exists in the db
    _data.read("checks", checkId, (err, dataCheck) => {
      if (!err && dataCheck) {
        //check if token is exists
        _data.read("tokens", token, (err, tokenData) => {
          if (!err && tokenData) {
            //verify if the token belongs to the user and it is not expired
            verify(dataCheck.userPhone, token, (verified) => {
              if (verified) {
                _data.delete("checks", checkId, (err) => {
                  if (!err) {
                    //look up the user
                    _data.read(
                      "users",
                      dataCheck.userPhone,
                      (err, userData) => {
                        if (!err && userData) {
                          const userChecks = userData.checks;
                          //remove the check from the list of checks
                          const checkPosition = userChecks.indexOf(checkId);
                          if (checkPosition > -1) {
                            userChecks.splice(checkPosition, 1);
                            //update the user object
                            _data.update(
                              "users",
                              dataCheck.userPhone,
                              userData,
                              (err) => {
                                if (!err) {
                                  callback(200, {
                                    message:
                                      "check has been deleted from db and user checklist",
                                  });
                                } else {
                                  callback(500, {
                                    err: "error occured when trying to delete check from the user checks list ",
                                  });
                                }
                              }
                            );
                          } else {
                            callback(500, {
                              err: "check cannot be found in the users list of checks",
                            });
                          }
                        } else {
                          callback(404, {
                            err: "user with this post does not exist",
                          });
                        }
                      }
                    );
                  } else {
                    callback(500, {
                      err: "error occured when tring to delete data",
                    });
                  }
                });
              } else {
                callback(403, {
                  err: "you are not authorized to delete this check",
                });
              }
            });
          } else {
            callback(400, { err: "token passed does not exist" });
          }
        });
      } else {
        callback(404, { err: "check does not exist" });
      }
    });
  } else {
    callback(400, {
      error:
        "the checkId passed is not valid or the token passed in the header is not valid",
    });
  }
};

module.exports = Delete;
