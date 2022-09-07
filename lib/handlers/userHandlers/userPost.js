const _data= require('../../data')
const helpers = require('../../helpers')
module.exports = function post(data,callback){
    const userData = data.payload;
  
  //check if the data gotten from the payload is valid
  const firstName =
    typeof(userData.firstName)== "string" &&
    userData.firstName.trim().length > 0
      ? userData.firstName.trim()
      : false;
  const lastName =
    typeof(userData.lastName)== "string" && userData.lastName.trim().length > 0
      ? userData.lastName.trim()
      : false;
  const phone =
    typeof(userData.phone) == "string" && userData.phone.trim().length == 11
      ? userData.phone.trim()
      : false;
  const password =
    typeof(userData.password) == "string" && userData.password.trim().length > 0
      ? userData.password.trim()
      : false;
  const tosAgreement =
    typeof(userData.tosAgreement) == "boolean" && userData.tosAgreement == true
      ? userData.tosAgreement
      : false;
  if (
    firstName &&
    lastName &&
    phone &&
    password &&
    tosAgreement
  ) {
    
    //make sure that the user does not already exist by saving the file name as the unique identifier(phone number) and trying to read it

    _data.read("users", phone, (err, data) => {
      if (err) {
        //hash the password. using a built in node module called crypto
        const hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          const user = {};
          user.firstName = firstName;
          user.lastName = lastName;
          user.phone = phone;
          user.hashedPassword = hashedPassword;
          user.tosAgreement = tosAgreement;

          //store the user in a file

          _data.create("users", phone, user, (err) => {
            (err == 'false')
              ? callback(200,{message:'user sucessfuly created'})
              : callback(500, { error: "could not create user" ,data:{user} });
          });
        } else {
          callback(500, "could not hash user password");
        }
      } else {
        //if result from read operation is data this means that the user already exists hence cannot follow through with post operation
        callback(400, {
          error: `user with phone number:${phone} already exists`,
        });
      }
    });
  } else {
    callback(400, { error: "data provided is invalid", data:[firstName,lastName,phone,password,tosAgreement] });
  }
};
