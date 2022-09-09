const _data= require('../../data')


//required data: token id 
//optional data none
module.exports = function get(data,callback){
 const tokenData = data.queryString
 //check if the token id passed is valid 
 const tokenId = typeof(tokenData.tokenId)=='string'&&tokenData.tokenId.length==20?tokenData.tokenId:false
 //check if token id exists 
if (tokenId){

 _data.read('tokens',tokenId,(err,data)=>{
    if(!err&&data){
      callback(200,data)
    }
    else{callback(404,{error:`tokenId does not match any in the db ${tokenId}`})}
 })
}
else{callback(400,{error:'data passed is invalid'})}
}