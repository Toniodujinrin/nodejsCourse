const _data= require('../../data')
//required data : id 
 module.exports=function Delete(data,callback){
    const tokenData = data.queryString
 //check if the token id passed is valid 
 const tokenId = typeof(tokenData.tokenId)=='string'&&tokenData.tokenId.length==20?tokenData.tokenId:false
 //check if token id exists 
if (tokenId){
 _data.read('tokens',tokenId,(err,data)=>{
    if(!err&&data){
      _data.delete('tokens',tokenId,(err)=>{
        if(!err)callback(200,{message:'token succesfully deleted'})
        else()
      })
    }
    else{callback(404,{error:`tokenId does not match any in the db ${tokenId}`})}
 })
}
else{callback(400,{error:'data passed is invalid'})}

}