import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient();
export async function signupPost(req, res) {


    const { userId, firstName, lastName, email, isAdmin } = req.query

    bcrypt.hash(req.query.password, 10)
        .then(async (hash) => {
            const result = await prisma.employee.create({
                data: {
                    userId,
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    isAdmin,
                }
            })
            res.json(result)
        
        })
        .catch((e) => {throw e})
    
        .finally(async () => {
            await prisma.$disconnect()
        });
}


export async function loginPost(req, res) {

    await prisma.employee.findMany({
        where: { email: req.query.email }
    })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User not exist" })

            // ❓ Comment la fonction sait que err = une erreure et data = les données (et pas l'inverse) ? 
            bcrypt.compare(req.query.password, user[0].password, (err, data) => {

                if (err) return res.status(404).json({ msg: "error" })
            
                if (data) {
                    return res.status(200).json({ msg: "Login success" })
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

