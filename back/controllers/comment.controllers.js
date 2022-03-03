import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function post (req, res) {

    // put request data in variables
    const commentId = uuidv4();
    const { postId, userId, author, message } = req.body;

    // create the comment in the DB 
    await prisma.user_comment.create({
        data: {
            commentId,
            postId,
            userId,
            author,
            message
        }
    })
        .then(() => {
            return res.status(200).json({
                status: 'succès',
                msg: 'Commentaire créé avec succès'
            })
        })
        .catch(e => res.send(e))
} 

export async function getAll (req, res) {
    // get all the comments that refeers to the post asked (order them by date ascending)
    await prisma.user_comment.findMany({
        where : {postId: req.params.postId},
        orderBy: [
            {
            date: 'desc',
            }]
    })
        .then((comments) => {
            if (!comments) return res.send('no comments')
            return res.send(comments);
        })
        .catch(e => res.send(e))
} 

export async function modifyComment(req, res) {
    // get the request message and update the comment in the DB
    const message = req.body.message;
    await prisma.user_comment.update({
        where: {
            commentId : req.params.commentId
        },
        data : {
            message: message
        }
    })
    .then(() => {
        res.send('commentaire modifié')
    })
}

export async function deleteComment (req, res) {
    // delete the comment in the database
    await prisma.user_comment.delete({
        where: {
            commentId: req.params.commentId,
        },
    })
        .then(res => res.send('Commentaire supprimé'))
        .catch(e => res.send(e))
}
