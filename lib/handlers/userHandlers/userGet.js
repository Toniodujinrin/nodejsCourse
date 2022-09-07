const _data= require('../../data')


module.exports =function get (data, callback) {
    //check the phone number is valid 
    const userData = data.queryString
    const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
    if (phone) {
      //check if the phone number provided exists in database 
      _data.read('users',phone,(err,data)=>{
        if(!err&&data){
         //remove the password from the object and return the user object
         delete data.hashedPassword 
         callback(200,data)
          
        }
        else{callback(400,{'error':`user with phone number ${phone} does not exist within the db`})}
      })
    
      
    } else {
      callback(400,{'error':'data provided is invalid'})
    }
    
    
    };