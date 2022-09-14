const _data = require("../../data");
const verify = require("../tokenHandlers/tokenVerify");

//required data: check Id
//optional data none
const get = function (data, callback) {
  const checkData = data.queryString;
  //validate incoming data
  const checkId =
    typeof checkData.checkId == "string" && checkData.checkId.length === 20
      ? checkData.checkId
      : false;
  const token =
    typeof data.headers.token == "string" && data.headers.token.length === 20
      ? data.headers.token
      : false;
  if (checkId && token) {
    //see if the check exists
    _data.read("checks", checkId, (err, dataCheck) => {
      if (!err && data) {
        //check if the requestor is the initiator of the check if true return the check if false return a callback
        // check if token passed in the header is valid
        _data.read("tokens", token, (err, data) => {
          if (!err && data) {
            //check if the phone number from the token matches the phone number in the check
            if (data.phone === dataCheck.userPhone) {
              //verify if the token is still up to date
              verify(data.phone, data.tokenId, (validity) => {
                if (validity) {
                  callback(200, dataCheck);
                } else {
                  callback(403, { err: "token passed has expired" });
                }
              });
            } else {
              callback(403, {
                error: "you are not authorized to view this data",
              });
            }
          } else {
            callback(400, { err: "token passed does not exist" });
          }
        });
      } else {
        callback(404, { err: "this check does not exist" });
      }
    });
  } else {
    callback(400, { err: "fields provided are invalid" });
  }
};

module.exports = get;
