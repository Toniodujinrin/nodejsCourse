const _data= require('../../data')
const tokenDelete = require('./tokenDelete')

//required data:id ,extend 
//optional data:none
module.exports=function put(data,callback){
    const tokenData = data.payload
    //check of required fields are calid 
    const tokenId = typeof(tokenData.tokenId)=='string'&&tokenData.tokenId.length==20?tokenData.tokenId:false
    const extend = typeof(tokenData.extend)=='boolean'&&tokenData.extend==true?true:false
    if(tokenId&&extend){
     //check if token exists if it does extend the expiration by an hour 
     _data.read('tokens',tokenId,(err,data)=>{
        if(!err&&data){
            if(data.expiration>Date.now()){
                 //extend expiration and leave othe fields as is 
            data.expiration = data.expiration + (1000*60*60)
            _data.update('tokens',tokenId,data,(err)=>{
                if(!err){
                    callback(200,{message:'token succesfully extended'})
                }
                else{callback(500,{error:'could not extend token'})}
            })
            }
            else{callback(400,{err:'talking already expired'})}
        }
        else{callback(404,{error:'token provided does not exist'})}
     })
    }else{callback(400,{error:'required fields invalid'})}

    

}