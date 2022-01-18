const { AuthenticationError } = require("apollo-server");
const { SECRET_KEY } = require("../config");
const jwt = require('jsonwebtoken');


module.exports  = (context)=>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        // Bearer Token
        const token = authHeader.split('Bearer ')[1];
        console.log(token);
        if(token){
            try{
                // verify the Token
                const user  = jwt.verify(token,SECRET_KEY);
                return user;
            }
            catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}