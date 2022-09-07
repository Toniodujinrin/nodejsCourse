const put = require('./userHandlers/userPut')
const post = require('./userHandlers/userPost')
const Delete = require('./userHandlers/userDelete')
const get = require('./userHandlers/userGet')


const userHandlers = {

}
userHandlers.post= post
userHandlers.get =get
userHandlers.Delete=Delete
userHandlers.put = put

module.exports = userHandlers
//_users - post
//required data: firstname, lastname, phone, password, tosAgreement
//optional data:none
// handlers._users.post = function (data, callback) {
//   const userData = data.payload;
  
//   //check if the data gotten from the payload is valid
//   const firstName =
//     typeof(userData.firstName)== "string" &&
//     userData.firstName.trim().length > 0
//       ? userData.firstName.trim()
//       : false;
//   const lastName =
//     typeof(userData.lastName)== "string" && userData.lastName.trim().length > 0
//       ? userData.lastName.trim()
//       : false;
//   const phone =
//     typeof(userData.phone) == "string" && userData.phone.trim().length == 11
//       ? userData.phone.trim()
//       : false;
//   const password =
//     typeof(userData.password) == "string" && userData.password.trim().length > 0
//       ? userData.password.trim()
//       : false;
//   const tosAgreement =
//     typeof(userData.tosAgreement) == "boolean" && userData.tosAgreement == true
//       ? userData.tosAgreement
//       : false;
//   if (
//     firstName &&
//     lastName &&
//     phone &&
//     password &&
//     tosAgreement
//   ) {
    
//     //make sure that the user does not already exist by saving the file name as the unique identifier(phone number) and trying to read it

//     _data.read("users", phone, (err, data) => {
//       if (err) {
//         //hash the password. using a built in node module called crypto
//         const hashedPassword = helpers.hash(password);
//         if (hashedPassword) {
//           const user = {};
//           user.firstName = firstName;
//           user.lastName = lastName;
//           user.phone = phone;
//           user.hashedPassword = hashedPassword;
//           user.tosAgreement = tosAgreement;

//           //store the user in a file

//           _data.create("users", phone, user, (err) => {
//             (err == 'false')
//               ? callback(200,{err:'user sucessfuly created'})
//               : callback(500, { error: "could not create user" ,data:{user} });
//           });
//         } else {
//           callback(500, "could not hash user password");
//         }
//       } else {
//         //if result from read operation is data this means that the user already exists hence cannot follow through with post operation
//         callback(400, {
//           error: `user with phone number:${phone} already exists`,
//         });
//       }
//     });
//   } else {
//     callback(400, { error: "data provided is invalid", data:[firstName,lastName,phone,password,tosAgreement] });
//   }
// };

// //_users - get
// //required data: phone
// //optional data: none 
// //@TODO only allow authorized users to access thier data 
// handlers._users.get = function (data, callback) {
// //check the phone number is valid 
// const userData = data.queryString
// const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
// if (phone) {
//   //check if the phone number provided exists in database 
//   _data.read('users',phone,(err,data)=>{
//     if(!err&&data){
//      //remove the password from the object and return the user object
//      delete data.hashedPassword 
//      callback(200,data)
      
//     }
//     else{callback(400,{'error':`user with phone number ${phone} does not exist within the db`})}
//   })

  
// } else {
//   callback(400,{'error':'data provided is invalid'})
// }


// };

// //users -put
// //required data: phone
// //optional data: firstname, lastname, password 
// //@todo only let an authorized users update data 
// handlers._users.put = function (data, callback) {
//  const userData = data.payload
//  //check for required fields 
//  const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
//  //check for optional fields
//  const firstName =
//     typeof(userData.firstName)== "string" &&
//     userData.firstName.trim().length > 0
//       ? userData.firstName.trim()
//       : false;
//   const lastName =
//     typeof(userData.lastName)== "string" && userData.lastName.trim().length > 0
//       ? userData.lastName.trim()
//       : false;
//   const password =
//     typeof(userData.password) == "string" && userData.password.trim().length > 0
//       ? userData.password.trim()
//       : false;

//  if((phone)&&(firstName||lastName||password)){
//    //check if phone exist 
//    _data.read('users',phone,(err,data)=>{
//     if(!err&&data){
//       //check for fields to update
//       if(firstName){
//         data.firstName= firstName
//       }
//       if(lastName){
//         data.lastName=lastName
//       }
//       if(password){
//         data.hashedPassword=helpers.hash(password)

//       }
//       //store new updates
//       _data.update('users',phone,data,(err)=>{
//         if(!err){
//           callback(200,{'message':'user succesfully updated'})


//         }
//         else{callback(500,{'err':'could not update user'})}
//       })

//     }
//     else{
//       callback(404,{'error':`user with phone number ${phone} does not exist within our db`})
//     }

//    })
//  }
//  else{
//   callback(400,{'error':'you must provide phone and 1 other update parameter'})
//  }


// };

// handlers._users.delete= function(data,callback){
//   const userData = data.queryString
//   const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
//   if (phone) {
//     //check if the phone number provided exists in database 
//     _data.read('users',phone,(err,data)=>{
//       if(!err&&data){
//        _data.delete('users',phone,(err)=>{
//         if(!err){
//           callback(200,{message:'user successfuly deleted from the database'})
//         }
//         else{callback(500,{err:'error occured trying to delete user'})}
//        })
        
//       }
//       else{callback(400,{'error':`user with phone number ${phone} does not exist within the db`})}
//     })
  
    
//   } else {
//     callback(400,{'error':'data provided is invalid'})
//   }
// }
