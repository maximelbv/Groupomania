import React from 'react';
import ReactDOM from 'react-dom'
import './LoginForm.scss';
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';
import axios from 'axios';
import validationGif from '../../assets/img/validation_anim.gif';

// Login form component : displayed on the login view with the hero component

const Loginform = () => {
    
    let login = {
        email: '',
        password: ''
    }

    // function triggered on the click of the 'submit' button of the form
    let connection = () => {
        // Request the API to login the user
        return axios.post('http://localhost:8080/api/auth/login', login)
            .then(async (res) => {
                // if the status of the response is 210 : display response errors
                if (res.status === 210) {
                    let errors = []
                    for (let i=0;i<res.data.errors.length;i++) {
                        errors.push(React.createElement('p', {}, res.data.errors[i].msg))
                    }
                    ReactDOM.render(
                        errors,
                        document.querySelector('.errors')
                    )
                // if the status of the response is 211 : display the specific error of the wrong id or password    
                } else if (res.status === 211) {
                    let wrong = React.createElement('p', {}, res.data.error)
                    ReactDOM.render(
                        wrong,
                        document.querySelector('.errors')
                    )
                // if the connexion is successfull : 
                // set token and user infos in the local storage
                // create a validation animation with the message 'welcome User'
                // redirect to the home page
                } else if (res.data.msg === 'Login success') {
                    await localStorage.setItem('userToken', res.data.token);
                    await localStorage.setItem('user', JSON.stringify(res.data.user));
                    const element = <div id='validationGif'><img src={validationGif} width="250px"/><p><span className='bonjour'>Bonjour</span><br/><span className='user'>{res.data.user.firstName}</span></p></div>
                    
                    ReactDOM.render(element, document.getElementById('loginCtn'));
                    setTimeout(() => {window.location.assign('/');}, 2000)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='loginCtn' id='loginCtn'>
    
        
        <div className='headerMobile'>
            <h1>Groupomania</h1>
        </div>
        
        <img className ='logoIllustration' src={shape}></img>
        
        <form className='LoginForm' id='loginForm'>


            <legend className='legend'>Connexion</legend>

            <p className='notAMember'>Vous n'avez pas de compte ? <a href='/signup'>Inscription</a></p>

            <label className='email'>Email 
                <input id='email' type='email' defaultValue={login.email} onChange={e => login.email = e.target.value}></input>
            </label>

            
            <label className='password'>Mot de passe 
                <input id='password' type='password' defaultValue={login.password} onChange={e => login.password = e.target.value}></input>
            </label>

            <div className='errors'></div>

            <input className='submit' onClick={connection} type='button' value="Connexion"></input>

        </form>
    </div>
    );
}

export default Loginform;
