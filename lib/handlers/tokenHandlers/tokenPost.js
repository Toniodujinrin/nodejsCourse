const _data= require('../../data');
const helpers = require('../../helpers');


module.exports= function post(data,callback){
    const userData= data.payload
    const phone =
    typeof(userData.phone) == "string" && userData.phone.trim().length == 11
      ? userData.phone.trim()
      : false;
  const password =
    typeof(userData.password) == "string" && userData.password.trim().length > 0
      ? userData.password.trim()
      : false;

    if(phone&&password){
       //look up the user who matches that phone number 
       _data.read('users',phone,(err,data)=>{
        if(!err&&data){
           //check if the password provided matches the password in the db
           //hash the provided password then compare it with hashed password in the file 
           if(data.hashedPassword===helpers.hash(password)){
            //if valid create a token with a random name.Set expiration date 1hr into future 
            const tokenId = helpers.createRandomString(20)
            const expiration= Date.now() + 1000 *60*60
            const token={
                tokenId:tokenId,
                phone:phone,
                expiration:expiration
            };
            //Store the token in a token file
            _data.create('tokens',tokenId,token,(err)=>{
                if(!err){
                    callback(200,token)
                }
                else callback(500,{err:err})
            })
           }
           else{callback(404,{error:'password provided is incorrect'})}

        }else{callback(404,{error:`user with phone number ${phone} does not exist`})}
       })
    }
    else{callback(200,{error:'missing required fields'})}
}