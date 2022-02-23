import { check } from 'express-validator';

export let signupCheck = [

    check('firstName')
        .notEmpty().withMessage('Le prénom ne peut pas être vide'),

    check('lastName')
        .notEmpty().withMessage('Le nom ne peut pas être vide'),

    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide')
        .isEmail().withMessage('Format incorrect, veuillez entrer une adresse email valide'),

    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage('Votre mot de passe doit comporter au moins 8 caractères, un caractère en majuscule et un chiffre')

]

export let loginCheck = [

    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide'),

    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')

]