import React, { useEffect } from 'react';
import './SignupForm.scss'
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';


// ❗️ data validation avec regex
// ❗️ submit disabled tant que les entrées sont pas conformes
// ❗️ redirection vers la page d'accueil quand réussite
// ❗️ display des erreures 

const Signup = () => {

    function setAccount() { 
        
        let account = {
            firstName : document.getElementById('prenom').value,
            lastName : document.getElementById('nom').value,
            email : document.getElementById('email').value,
            password : document.getElementById('password').value
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        };
        fetch('http://localhost:8080/api/auth/signup', requestOptions)
            .then(response => {
                // ❓ 
                // Au 1er envoi du formulaire, ça ne fait rien,
                // au 2eme envoi, ça enregistre le compte dans la DB mais ne fait pas de redirection
                // au 3eme envoi, ça enregistre dans la DB et fait la redirection 
                window.location.assign('/login')
            })
    }

    return (
        <div className='signupCtn'>
        
            
            <div className='headerMobile'>
                <h1>Groupomania</h1>
            </div>

            <img className ='logoIllustration' src={shape}></img>
            
            <form className='SignupForm' onSubmit={setAccount}>


                <legend className='legend'>Inscription</legend>

                <p className='alreadyMember'>Déjà membre ? <a href='/login'>Connexion</a></p>

                <label className='prenom' >Prénom 
                    <input id='prenom' type='text'></input>
                </label>

                <label className='nom' >Nom 
                    <input id='nom' type='text'></input>
                </label>

                <label className='email' >Email 
                    <input id='email' type='email'></input>
                </label>

                
                <label className='password' >Mot de passe 
                    <input id='password' type='password'></input>
                </label>

                <div className='agreeTerms'>      
                    <label>
                        <input type='checkbox' tabIndex='999'></input>
                        J'accepte les <a target='_blank' href='/terms'>Termes de services</a> et la <a target='_blank' href='/privacy'>Politique de confidentialité</a>
                        </label>
                </div>

                <input className='submit' type='submit' value="Créer mon compte"></input>

            </form>
        </div>
    );
}

export default Signup;
