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
        
            .catch((e) => {throw e})
        
            .finally(async () => {
                await prisma.$disconnect()
            })
        });
}


export function loginPost(req, res) {
   
}