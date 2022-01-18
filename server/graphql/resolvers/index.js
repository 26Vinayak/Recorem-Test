const userResolver = require('./user');
const articleResolver = require('./article');


module.exports = {
    Query:{
        ...userResolver.Query,
        ...articleResolver.Query,
        sayHi: ()=>"Hello Vinayark Dhiman is a good boy!"
    },
    Mutation:{
        ...userResolver.Mutation,
        ...articleResolver.Mutation,
    }
};