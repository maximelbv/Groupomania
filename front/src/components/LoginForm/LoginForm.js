import React from 'react';
import './LoginForm.scss';
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';

const Loginform = () => {

    function sendLogin() {

        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
        };
        
        let login = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then(response => {
                let statusMessage = document.createElement('p').innerText(`${response.msg}`)
                document.querySelector('.LoginForm').appendChild(statusMessage);
                localStorage.setItem('userToken', JSON.stringify(response))
                window.location.assign('/')
            })

    }

    return (
        <div className='loginCtn'>
    
        
        <div className='headerMobile'>
            <h1>Groupomania</h1>
        </div>
        
        <img className ='logoIllustration' src={shape}></img>
        
        <form className='LoginForm' onSubmit={sendLogin}>


            <legend className='legend'>Connexion</legend>

            <p className='notAMember'>Vous n'avez pas de compte ? <a href='/signup'>Inscription</a></p>

            <label className='email'>Email 
                <input id='email' type='email'></input>
            </label>

            
            <label className='password'>Mot de passe 
                <input id='password' type='password'></input>
            </label>

            <input className='submit' type='submit' value="Connexion"></input>

        </form>
    </div>
    );
}

export default Loginform;
