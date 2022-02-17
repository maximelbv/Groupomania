import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export function signupPost(req, res) {
    console.log('ok')
    const userId = uuidv4();
    const { firstName, lastName, email, password } = req.body;

    return bcrypt.hash(password, 10)
        .then((hash, err) => {
            if (err) {throw err;}
            var sql = `INSERT INTO employee (userId, firstName, lastName, email, password) VALUES ('${userId}', '${firstName}', '${lastName}', '${email}', '${hash}')`
            db.query(
               sql,
               (err, data) => {
                   return res.status(201).json({
                       status: 'success',
                       message: 'user created',
                   })
               }
           )
        })
        .catch((err) => {res.status(400).json({message : 'error'})})
    
}


export async function loginPost(req, res) {

    // await prisma.employee.findMany({
    //     where: { email: req.body.email }
    // })
    //     .then(user => {
    //         if (!user) return res.status(400).json({ msg: "User not exist" })

    //         // ❓ Comment la fonction sait que err = une erreure et data = les données (et pas l'inverse) ? 
    //         bcrypt.compare(req.body.password, user[0].password, (err, data) => {

    //             if (err) return res.status(404).json({ msg: "error" })
            
    //             if (data) {
    //                 return res.status(200).json({ 
    //                     msg: "Login success", 
    //                     token: jwt.sign(
    //                         {userId: req.body.userId},
    //                         process.env.JWT_SECRET,
    //                         {expiresIn: '24h'}
    //                     )
    //                 })
    //             } else {
    //                 return res.status(401).json({ msg: "Invalid credencial" }) 
    //             }

    //         })
    //     })
    // .catch((e) => {throw e})
        
    // .finally(async () => {
    //     await prisma.$disconnect()
    // }) 

}

