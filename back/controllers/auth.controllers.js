import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export function signupPost(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(210).json({errors: errors.array()})
    } else {
        
        const userId = uuidv4();
        const { firstName, lastName, email, password } = req.body;

        prisma.employee.findMany()
        .then((user) => {

            for (let i=0; i < user.length; i++) {
                
                if (user[i].email === email) {
                    return res.status(211).json({error : 'Adresse mail déjà utilisée'})
                } else {
    
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
            }

        })
        .catch(err => res.status(400).json(err))
    




    }

}


export async function loginPost(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(210).json({errors: errors.array()})
    } else {

        await prisma.employee.findMany({
            where: { email: req.body.email }
        })
            .then(user => {
                if (!user) {
                    return res.status(211).json({ error: "Mauvais identifiant ou mot de passe" })
                } else {
                    
                    console.log(user) 
                    bcrypt.compare(req.body.password, user[0].password, (err, data) => {
        
                        if (err) return res.status(404).json({ msg: "error" })
                    
                        if (data) {
                            return res.status(200).json({ 
                                msg: "Login success", 
                                user: user[0],
                                token: jwt.sign(
                                    {userId: req.body.userId},
                                    process.env.JWT_SECRET,
                                    {expiresIn: '24h'}
                                )
                            })
                        } else {
                            return res.status(211).json({ error: "Mauvais identifiant ou mot de passe" }) 
                        }
        
                    })
                }
    
            })
        .catch((e) => {throw e})
            
        .finally(async () => {
            await prisma.$disconnect()
        }) 

    }


} 

export async function deleteUser(req, res) {
    await prisma.employee.delete({
        where: {userId: req.params.userId}
    })
    .then(res => res.status(200).json(res))
    .catch(err => res.status(400).json(err))
}

export async function requireAuth(req, res, next) {

    try {
        // take the authorization token (and remove the 'Bearer ')
        const token = req.headers.authorization.split(' ')[1];
        // verify if the token matches the env token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId };
        console.log(userId);
        // if not: throw an error message
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user id non valable';
        // else: continue the execution
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }
}
