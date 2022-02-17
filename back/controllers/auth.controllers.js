import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export function signupPost(req, res) {

    console.log('ok')
    const userId = uuidv4();
    const { firstName, lastName, email, password } = req.body;

    return bcrypt.hash(password, 10)
        .then(async (hash) => {
            const result = await prisma.employee.create({
                data: {
                    userId,
                    firstName,
                    lastName,
                    email,
                    password: hash,
                }
            })
            return res.status(200).json({
                status: 'succès',
                msg: 'Votre compte a bien été créé'
            })

        })
        .catch((e) => {throw e})

        .finally(async () => {
            await prisma.$disconnect()
        });

}


export async function loginPost(req, res) {

    await prisma.employee.findMany({
        where: { email: req.body.email }
    })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User dont exist" })

            console.log(user) 
            bcrypt.compare(req.body.password, user[0].password, (err, data) => {

                if (err) return res.status(404).json({ msg: "error" })
            
                if (data) {
                    return res.status(200).json({ 
                        msg: "Login success", 
                        token: jwt.sign(
                            {userId: req.body.userId},
                            process.env.JWT_SECRET,
                            {expiresIn: '24h'}
                        )
                    })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" }) 
                }

            })
        })
    .catch((e) => {throw e})
        
    .finally(async () => {
        await prisma.$disconnect()
    }) 

}

