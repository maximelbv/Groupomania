import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const prisma = new PrismaClient();

export async function post (req, res) {

    // get the request data and put it in variables( use uuid for the postId)
    // if there is a file in the request, define the picture as a link where she is stocked
    const postId = uuidv4();
    const { userId, author, message } = req.body;
    const picture = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';

    //create the post
    await prisma.user_post.create({
        data: {
            postId,
            userId,
            author,
            message,
            picture : picture,
        }
    })
        .then(() => {
            return res.status(200).json({
                status: 'succès',
                msg: 'Post créé avec succès'
            })
        })
        .catch(e => res.send(e))
} 

export async function getAll (req, res) {
    // get all the posts in the DB and order them ascending
    await prisma.user_post.findMany({
        orderBy: [
            {
            date: 'desc',
            }]
    })
        .then((users) => {
            if (!users) return res.send('no posts')
            return res.send(users);
        })
        .catch(e => res.send(e))
} 

export async function modifyPost(req, res) {
    // get the request data and put it in variables( use uuid for the postId)
    // if there is a file in the request, define the picture as a link where she is stocked
    const message = req.body.message;
    let picture;
    if (req.file) picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // update the post in the DB
    await prisma.user_post.update({
        where: {
            postId : req.params.postId
        },
        data : {
            message: message,
            picture: picture,
        }
    })
    .then(() => {
        res.send('post modifié')
    })
    .catch(e => res.send(e))
}

export async function deletePost (req, res) {
    // delete the user in the DB
    await prisma.user_post.delete({
        where: {
            postId: req.params.postId,
        },
    })
        .then(res => {
            if (res.picture !== '') {      
                // delete the picture stocked in ./images          
                fs.unlink(res.picture.replace('http://localhost:8080/images/', 'images/'), err => {
                    if (err) {res.send(err)}
                });
            }
            res.send('Post supprimé')
        })
        .catch(e => res.send(e))
}

export async function getAllFromUser (req, res) {
    // find posts that refeers to the user 
    await prisma.user_post.findMany({
        where : {
            userId : req.params.userId
        }
    })
        .then((post) => {
            if (!post) return res.send('no posts')
            return res.send(post);
        })
        .catch(e => res.send(e))
}
