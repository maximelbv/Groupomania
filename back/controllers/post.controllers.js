import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function post (req, res) {

    const postId = uuidv4();
    const { userId, commentsId, author, message, picture, video } = req.body;

    await prisma.user_post.create({
        data: {
            postId,
            userId,
            commentsId,
            author,
            message,
            picture,
            video,
        }
    })
    return res.status(200).json({
        status: 'succès',
        msg: 'Post créé avec succès'
    })
    // .catch((e) => {throw e})

    // .finally(async () => {
    //     await prisma.$disconnect()
    // });
} 

export async function getAll (req, res) {
    await prisma.user_post.findMany()
        .then((users) => {
            if (!users) return res.send('no posts')
            return res.send(users);
        })
        .catch(e => res.send(e))
} 

export async function deletePost (req, res) {
    await prisma.user_post.delete({
        where: {
            postId: req.params.postId,
        },
    })
        .then(res => res.send('Post supprimé'))
        .catch(e => res.send(e))
}