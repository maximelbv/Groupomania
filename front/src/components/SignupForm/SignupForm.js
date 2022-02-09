import React from 'react';
import './SignupForm.scss'
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';

const Singup = () => {
    return (
        <div className='signupCtn'>
        
            
            <div className='headerMobile'>
                <h1>Groupomania</h1>
            </div>

            <img className ='logoIllustration' src={shape}></img>
            
            <form className='SignupForm'>


                <legend className='legend'>Inscription</legend>

                <p className='alreadyMember'>Déjà membre ? <a href='/login'>Connexion</a></p>

                <label className='prenom'>Prénom 
                    <input type='text'></input>
                </label>

                <label className='nom'>Nom 
                    <input type='text'></input>
                </label>

                <label className='email'>Email 
                    <input type='email'></input>
                </label>

                
                <label className='password'>Mot de passe 
                    <input type='password'></input>
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

export default Singup;
