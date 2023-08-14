const Joi = require('joi');
const Comment = require('../models/comment')
const commentDTO = require('../dto/comment');


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;


const commentController = {
    async create(req, res, next){
        const creatCommentSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blog:Joi.string().regex(mongodbIdPattern).required()
        });
        const {error} = creatCommentSchema.validate(req.body);

        if(error){
            return next(error)
        }

        const {content, author, blog} = req.body;
        try{
            const newComment = new Comment({
                content, author, blog
            })
            await newComment.save()
        }
        catch(error){
            return next(error)
        }

        return res.status(201).json({message:"comment added"})

    },
    async getById(req, res , next){
        const getBIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = getBIdSchema.validate(req.params);

        if(error){
            return next(error)
        }
        const {id} = req.params;

        let comments;
        try{
           comments = await Comment.find({blog:id}).populate('author')
        }
        catch(error){
            return next(error)
        }
        let commentDto = [];
        for(let i = 0; i < comments.length; i++ ){
            const obj = new commentDTO(comments[i]);
            commentDto.push(obj);
        }
        return res.status(200).json({data:commentDto})
    },
}



module.exports = commentController;