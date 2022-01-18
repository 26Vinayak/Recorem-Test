const User = require('../../models/User');
const {validateRegisterInput, validateLoginInput} = require('./../../utils/validate');
const {SECRET_KEY} = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

function generateToken(user){
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },SECRET_KEY,{expiresIn:'1h'});
}
module.exports  = {
    Query:{

        // Get the all user List
        async getUsers(){
            try{
                const Users = await User.find().sort({createdAt:-1});
                return Users;
            }
            catch(err){
                throw new UserInputError('Errors',{err});
            }
        }
    },
    Mutation:{
        async register(
            _,
            {
                registerInput:{username,email,password,confirmPassword}
            },
            context,info){
            //  validate user data
                const {valid,errors} = validateRegisterInput(username,email,password,confirmPassword);
                 if(!valid){
                     throw new UserInputError('Errors',{errors});
                 }
            
            //  Makes sure user doesnot already exists
                const user  = await User.findOne({username});
                if(user){
                    throw new UserInputError('Username is taken',{
                        errors:{
                            username:'This is username is taken'
                        }
                    });
                }
            //  hash password and create an auth token
            password = await bcrypt.hash(password,12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id:res._id,
                token
            };
        },
        async login(_,{username,password}){
            // validate userData
            const {valid,errors} = validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            // find user into  Database 
            const user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found',{errors});
            }
            // compare current password with user password
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                errors.general = 'Wrong credentails';
                throw new UserInputError('Wrong crednetails',{errors});
            }

            // generate Token
            const token = generateToken(user);
            return {
                ...user._doc,
                id:user._id,
                token
            }
        }
    }
}