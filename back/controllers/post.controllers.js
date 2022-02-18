import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export async function post (req, res) {

    const { userId, message, picture, video, date } = req.body;

    await prisma.user_post.create({
        data: {
            userId,
            message,
            picture,
            video,
            date
        }
    })
    return res.status(200).json({
        status: 'succès',
        msg: 'Votre compte a bien été créé'
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