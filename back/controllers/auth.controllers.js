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

        return bcrypt.hash(password, 10)
            .then(async (hash) => {
                await prisma.employee.create({
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
            .catch((e) => {
                if (e.code === 'P2002' && e.meta.target === 'email') {
                    return res.status(400).json({e: 'Adresse email déjà utilisée'})
                }
                console.log(e);
                return res.status(400).json(e);
            })
    
            .finally(async () => {
                await prisma.$disconnect()
            });
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
                if (!user || user === []) {
                    return res.status(211).json({ error: "Mauvais identifiant ou mot de passe" })
                } else {
                    
                    
                    user[0] && bcrypt.compare(req.body.password, user[0].password, (err, data) => {
        
                        if (err) return res.status(404).json({ msg: "error" })
                    
                        if (data) {
                            let tok = jwt.sign(
                                    {'userId': user[0].userId},
                                    process.env.JWT_SECRET,
                                    {expiresIn: '24h'}
                                );
                            return res.status(200).json({ 
                                msg: "Login success", 
                                user: user[0],
                                token: tok
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

export async function modifyAccount(req, res) {

    const { firstName, lastName } = req.body;

    await prisma.employee.update({
        where: {
            userId : req.params.userId
        },
        data : {
            firstName: firstName,
            lastName: lastName
        }
    })
    .then((user) => {
        res.send(user)
    })

}

export async function deleteUser(req, res) {
    await prisma.employee.delete({
        where: {userId: req.params.userId}
    })
    .then(res => res.status(200).json(res))
    .catch(err => res.status(400).json(err))
}

// authentification middleware: applied on post & comment routes
export async function requireAuth(req, res, next) {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken && decodedToken.userId) {
            next();
        } else {
            throw 'user id non valable';
        }
    } catch(error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }
}
