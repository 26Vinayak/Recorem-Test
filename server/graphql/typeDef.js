const {gql} = require('apollo-server');

module.exports = gql`
    type Article{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
        likes:[Like]!
        likeCount:Int!
    }
    type Like{
        id:ID!
        createdAt:String!
        username:String!         
    }
    type User{
        id:ID!
        email:String!
        token:String!
        username:String!
        createdAt:String!
    }
    input RegisterInput{
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getUsers:[User]
        getArticles:[Article]
        sayHi:String!
    }
    type Mutation{
        register(registerInput:RegisterInput):User!
        login(username:String!,password:String!):User!
        createArticle(body:String!) : Article!
        deleteArticle(body:String!) : String!

    }
`; 