/*

helper functions for tasks
*/
const config = require("./config");
const crypto = require("crypto");

const helpers = {};

//create a SHA256 hash
helpers.hash = function (str) {
  var hash = crypto
    .createHmac("sha256", config.hashingSecret)
    .update(str)
    .digest("hex");
  return hash;
};

helpers.parseJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (error) {
    return {};
  }
};

helpers.createRandomString = function(strLength){
strLength = typeof(strLength) == 'number'?strLength:false
if(strLength){
    //define all possible characters that can go into the string
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    //create string
    let str=''
    for(let i=0;i<strLength;i++){
        const randomLetter =  possibleChars.at(Math.floor(Math.random()*strLength))
        str+=randomLetter
    }

    return str


}
else{
    return false
}
}

module.exports = helpers;
