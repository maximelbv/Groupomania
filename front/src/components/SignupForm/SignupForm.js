import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './SignupForm.scss'
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';
import axios from 'axios';


// ❗️ data validation avec regex
// ❗️ submit disabled tant que les entrées sont pas conformes
// ❗️ redirection vers la page d'accueil quand réussite
// ❗️ display des erreures 

const SignupForm = () => {

    let navigate = useNavigate();

    let info = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    let createAccount = () => {
        console.log('1');
                   
        return axios.post('http://localhost:8080/api/auth/signup', info)
            .then(() => {
                console.log('2');
                navigate("/login");
            }) 
            .catch(err => console.log(err))
    }

    return (
        <div className='signupCtn'>
        
            
            <div className='headerMobile'>
                <h1>Groupomania</h1>
            </div>

            <img className ='logoIllustration' src={shape}></img>
            
            <form className='SignupForm' id='SignupForm'>


                <legend className='legend'>Inscription</legend>

                <p className='alreadyMember'>Déjà membre ? <a href='/login'>Connexion</a></p>

                <label className='prenomLabel' >Prénom 
                    <input id='prenom' type='text' defaultValue={info.firstName} onChange={e => info.firstName = e.target.value}></input>
                </label>

                <label className='nomLabel' >Nom 
                    <input id='nom' type='text' defaultValue={info.lastName} onChange={e => info.lastName = e.target.value} ></input>
                </label>

                <label className='emailLabel' >Email 
                    <input id='email' type='email' defaultValue={info.email} onChange={e => info.email = e.target.value} ></input>
                </label>

                
                <label className='passwordLabel' >Mot de passe 
                    <input id='password' type='password' defaultValue={info.password} onChange={e => info.password = e.target.value} ></input>
                </label>

                <div className='agreeTerms'>      
                    <label>
                        <input type='checkbox' tabIndex='999'></input>
                        J'accepte les <a target='_blank' href='/terms'>Termes de services</a> et la <a target='_blank' href='/privacy'>Politique de confidentialité</a>
                        </label>
                </div>

                <input type='button' onClick={createAccount} className='submit' value="Créer mon compte"></input>

            </form>
        </div>
    );
}

export default SignupForm;
