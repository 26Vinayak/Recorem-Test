const {ApolloServer} = require('apollo-server');
const mongoose  = require('mongoose');
const typeDefs = require('./graphql/typeDef'); 
const Article = require('./models/Article');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

const PORT = process.env.PORT || 5000;

// Start the ApolloServer with passing Graphql Definition Schema and Resolver
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


// Connnect DB and start the servers 
mongoose.connect(MONGODB,{useNewUrlParser:true}).then(()=>{
    return server.listen({port:PORT});
}).then((res)=>{
    console.log(`Server running at ${res.url}`);
}).catch((err)=>{
    console.error(err);
})
