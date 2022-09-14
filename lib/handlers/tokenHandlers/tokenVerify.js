const _data = require("../../data");
module.exports = function verify(phone, tokenId, callback) {
  _data.read("tokens", tokenId, (err, data) => {
    if (!err && data) {
      if (data.phone == phone && data.expiration > Date.now()) {
        callback(true);
      } else callback(false);
    } else {
      callback(false);
    }
  });
};
