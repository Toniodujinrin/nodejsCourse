const _data= require('../../data')
const helpers = require('../../helpers')
const verify = require('../tokenHandlers/tokenVerify')


module.exports=function put (data, callback) {
    const userData = data.payload
    //check for required fields 
    const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
    //check for optional fields
    const firstName =
       typeof(userData.firstName)== "string" &&
       userData.firstName.trim().length > 0
         ? userData.firstName.trim()
         : false;
     const lastName =
       typeof(userData.lastName)== "string" && userData.lastName.trim().length > 0
         ? userData.lastName.trim()
         : false;
     const password =
       typeof(userData.password) == "string" && userData.password.trim().length > 0
         ? userData.password.trim()
         : false;
     const token = typeof(data.headers.token)=='string'?data.headers.token:false
   
    if((phone)&&(firstName||lastName||password)){
      //check if phone exist 
      _data.read('users',phone,(err,data)=>{
       if(!err&&data){
        verify(phone,token,(validity)=>{
            if(validity){
        
         //check for fields to update
         if(firstName){
           data.firstName= firstName
         }
         if(lastName){
           data.lastName=lastName
         }
         if(password){
           data.hashedPassword=helpers.hash(password)
   
         }
         //store new updates
         _data.update('users',phone,data,(err)=>{
           if(!err){
             callback(200,{'message':'user succesfully updated'})
   
   
           }
           else{callback(500,{'err':'could not update user'})}
        
         })

        }else{callback(403,{error:`token to access this data is required or token provided is invalid ${token}`})}
    
    })
   
       }
       else{
         callback(404,{'error':`user with phone number ${phone} does not exist within our db`})
       }
    
   
      })
    }
    else{
     callback(400,{'error':'you must provide phone and 1 other update parameter'})
    }
   
   
   };