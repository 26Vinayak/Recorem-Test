const Article = require("../../models/Article");
const checkAuth = require("../../utils/checkAuth");



module.exports = {
    Query:{
        async getArticles(){
            try{
                const articles = await Article.find().sort({ createdAt: -1 });
                return articles;
            }
            catch(err){
                throw new UserInputError('Errors',{err});
            }
        }
    },
    Mutation:{
        async createArticle(_,{body},context){
            const user = checkAuth(context);
            console.log(user);
            if(body.trim()===''){
                throw new Error('Article body must not be empty');
            }
            const newArticle = new Article({
                body,
                user:user.id,
                username:user.username,
                createdAt:new Date().toISOString()
            });
            const article  = await newArticle.save();
            // context.pubsub.publish('NEW_ARTICLE', {
            //     newArticlet: article
            // });
            return article;
        }
    },
}
