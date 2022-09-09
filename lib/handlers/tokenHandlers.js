const put = require('./tokenHandlers/tokenPut')
const post = require('./tokenHandlers/tokenPost')
const Delete = require('./tokenHandlers/tokenDelete')
const get = require('./tokenHandlers/tokenGet')
const verify = require('./tokenHandlers/tokenVerify')
const tokenHandlers =  {

}
tokenHandlers.verify=verify
tokenHandlers.put= put
tokenHandlers.post=post
tokenHandlers.delete=Delete
tokenHandlers.get=get



module.exports = tokenHandlers