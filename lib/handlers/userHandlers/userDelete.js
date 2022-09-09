const _data= require('../../data')
const verify = require('../tokenHandlers/tokenVerify')



module.exports = function Delete(data,callback){
    const userData = data.queryString
    const phone = typeof(userData.phone)=='string'&&userData.phone.trim().length==11?userData.phone:false 
    const token = typeof(data.headers.token)=='string'?data.headers.token:false
    if (phone) {
      //check if the phone number provided exists in database 
      _data.read('users',phone,(err,data)=>{
        if(!err&&data){
            verify(phone,token,(validity)=>{
                if(validity){
         _data.delete('users',phone,(err)=>{
          if(!err){
            callback(200,{message:'user successfuly deleted from the database'})
          }
          else{callback(500,{err:'error occured trying to delete user'})}
         })
          
        }
        else{callback(400,{'error':`user with phone number ${phone} does not exist within the db`})}
      })
    }else{callback(403,{error:'you must provide a valid token to perform operations on this user'})}

})
    
      
    } else {
      callback(400,{'error':'data provided is invalid'})
    }
  }
  