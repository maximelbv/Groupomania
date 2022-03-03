import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export function signupPost(req, res) {
    // errors from express validator (./middlewares/authDataValidation)
    const errors = validationResult(req);
    // if express validator array is not empty return the error
    if (!errors.isEmpty()) {
        return res.status(210).json({errors: errors.array()})
    } else {      
        // put the request data in variables (also pass the userId in uuid, and password in bcrypt)
        // and create the employee in the database
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
            // P2002 prisma code indicates that the entry already exists in the database and is unique
            // so, if the error code returned is P2002 return the error 'already used'
            .catch((e) => {
                if (e.code === 'P2002' && e.meta.target === 'email') {
                    return res.status(211).json({e: 'Adresse email déjà utilisée'})
                }
                return res.status(400).json(e);
            })
    
            .finally(async () => {
                await prisma.$disconnect()
            });
    }

}

export async function loginPost(req, res) {
    // errors from express validator (./middlewares/authDataValidation)
    const errors = validationResult(req);
    // if express validator array is not empty return the error
    if (!errors.isEmpty()) {
        return res.status(210).json({errors: errors.array()})
    } else {
        // else, find in the DB the user that correspond to the request
        await prisma.employee.findMany({
            where: { email: req.body.email }
        })
            .then(user => {
                // if there is no user return error
                if (!user || user.length === 0) {
                    return res.status(211).json({ error: "Mauvais identifiant ou mot de passe" })
                } else {
                    // else, compare the request password with the DB user password
                    user[0] && bcrypt.compare(req.body.password, user[0].password, (err, data) => {
        
                        if (err) return res.status(404).json({ msg: "error" })
                        // if ok, create a token that will be used for the authentification
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
    // get the request data and put it in variables
    const { firstName, lastName } = req.body;
    // update the data for the user in the DB
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
    .catch(e => res.send(e))

}

export async function deleteUser(req, res) {
    // delete the user
    await prisma.employee.delete({
        where: {userId: req.params.userId}
    })
    .then(res => res.status(200).json(res))
    .catch(err => res.status(400).json(err))
}

// authentification middleware: applied on post & comment routes
export async function requireAuth(req, res, next) {
    // try to get the authorization token (in the request headers) and delete the 'Bearer'
    // verify the token
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
