const {gql} = require('apollo-server');

module.exports = gql`
    type User{
        id:ID!
        email:String!
        token:String!
        username:String!
        createdAt:String!
    }
    type Query{
        sayHi:String!
    }
`; 