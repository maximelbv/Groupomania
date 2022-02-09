import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db.js';

dotenv.config();

// console.log(db);

export function signupPost(req, res) {
    let sql = `INSERT INTO user (firstName, lastName, email, password) VALUES ('${req.query.firstName}', '${req.query.lastName}', '${req.query.email}', '${req.query.password}')`;
    db.query(sql, err => {
    if (err){throw err}
    return res.send('user created');
    })

}