const _data= require('../../data')
const verify = require('../tokenHandlers/tokenVerify')


module.exports =function get (data, callback) {
    //check the phone number is valid 
    const userData = data.queryString
    const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
    const token = typeof(data.headers.token)=='string'?data.headers.token:false
    
    if (phone) {
      //check if the phone number provided exists in database 
      _data.read('users',phone,(err,data)=>{
        if(!err&&data){

        verify(phone,token,(validity)=>{
            if(validity){
                 //remove the password from the object and return the user object
            delete data.hashedPassword 
             callback(200,data)
            }
            else{callback(403,{error:'missing required token'})}
        })
        
          
        }
        else{callback(400,{'error':`user with phone number ${phone} does not exist within the db`})}
      })
    
      
    } else {
      callback(400,{'error':'data provided is invalid'})
    }
    
    
    };