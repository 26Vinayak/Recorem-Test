const userResolver = require('./user');



module.exports = {
    Query:{
        ...userResolver.Query,
        sayHi: ()=>"Hello Vinayark Dhiman is a good boy!"
    },
    Mutation:{
        ...userResolver.Mutation,
    }
};