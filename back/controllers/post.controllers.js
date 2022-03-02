import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const prisma = new PrismaClient();

export async function post (req, res) {

    const postId = uuidv4();
    const { userId, author, message } = req.body;
    const picture = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';

    console.log('req', req.file);

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
    console.log(req.body);
    const message = req.body.message;
    let picture;
    if (req.file) picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
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
}

export async function deletePost (req, res) {
    await prisma.user_post.delete({
        where: {
            postId: req.params.postId,
        },
    })
        .then(res => {
            if (res.picture !== '') {                
                fs.unlink(res.picture.replace('http://localhost:8080/images/', 'images/'), err => {
                    if (err) {console.log(err)}
                    else {console.log('image supprimée')}
                });
            }
            res.send('Post supprimé')
        })
        .catch(e => res.send(e))
}

export async function getAllFromUser (req, res) {
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
