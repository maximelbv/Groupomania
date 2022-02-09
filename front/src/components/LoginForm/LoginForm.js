import React from 'react';
import './LoginForm.scss';
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';

const Loginform = () => {
    return (
        <div className='loginCtn'>
    
        
        <div className='headerMobile'>
            <h1>Groupomania</h1>
        </div>
        
        <img className ='logoIllustration' src={shape}></img>
        
        <form className='LoginForm'>


            <legend className='legend'>Connexion</legend>

            <p className='notAMember'>Vous n'avez pas de compte ? <a href='/signup'>Inscription</a></p>

            <label className='email'>Email 
                <input type='email'></input>
            </label>

            
            <label className='password'>Mot de passe 
                <input type='password'></input>
            </label>

            <input className='submit' type='submit' value="Connexion"></input>

        </form>
    </div>
    );
}

export default Loginform;
