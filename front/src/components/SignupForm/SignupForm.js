import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import './SignupForm.scss'
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';
import axios from 'axios';

// Signup form component : displayed on the signup view with the hero component

const SignupForm = () => {

    // react hook used to navigate 
    let navigate = useNavigate();

    // define the info object that will be used on the signup API request
    let info = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: false
    };

    // triggered on click of the submit form button
    let createAccount = () => {
        // request the API to signup the user
        return axios.post('http://localhost:8080/api/auth/signup', info)
            .then((res) => {
                // if the response status is 210 (exress validator errors) loop the errors and push them in 
                // the error array, and display the error array
                if (res.status === 210) {
                    let errors = []
                    for (let i=0;i<res.data.errors.length;i++) {
                        errors.push(React.createElement('p', {}, res.data.errors[i].msg))
                    }
                    ReactDOM.render(
                        errors,
                        document.querySelector('.errors')
                    )
                // the 211 status error means a specific error : 'already used email'
                // display this error if the response status is 211    
                } else if (res.status === 211) {
                    console.log(res);
                    let emailAlreadyUsed = React.createElement('p', {}, 'Adresse mail déjà utilisée')
                    ReactDOM.render(
                        emailAlreadyUsed,
                        document.querySelector('.errors')
                    )
                // if everything is good, navigate to login
                } else {
                    navigate("/login");
                }
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
                    <input autoComplete="on" id='password' type='password' defaultValue={info.password} onChange={e => info.password = e.target.value} ></input>
                </label>

                <div className='agreeTerms'>      
                    <label>
                        <input type='checkbox' tabIndex='999'></input>
                        J'accepte les <a target='_blank' href='/terms'>Termes de services</a> et la <a target='_blank' href='/privacy'>Politique de confidentialité</a>
                        </label>
                </div>

                <div className='errors'></div>

                <input type='button' onClick={createAccount} className='submit' value="Créer mon compte"></input>

            </form>
        </div>
    );
}

export default SignupForm;
