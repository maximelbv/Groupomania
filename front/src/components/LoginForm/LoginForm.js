import React from 'react';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom'
import './LoginForm.scss';
import '../../styles/forms.scss'
import shape from '../../assets/img/Shape.svg';
import axios from 'axios';
import validationGif from '../../assets/img/validation_anim.gif';

const Loginform = () => {

        let navigate = useNavigate();
        
        let login = {
            email: '',
            password: ''
        }

        let connection = () => {
            return axios.post('http://localhost:8080/api/auth/login', login)
                .then((res) => {
                    if (res.data.msg === 'Login success') {
                        localStorage.setItem('userToken', res.data.token);
                        const element = <div id='validationGif'><img src={validationGif} width="250px"/><p><span className='bonjour'>Bonjour</span><br/><span className='user'>User</span></p></div>
                        
                        ReactDOM.render(element, document.getElementById('loginCtn'));
                        setTimeout(() => {navigate("/");}, 2000)
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

            <input className='submit' onClick={connection} type='button' value="Connexion"></input>

        </form>
    </div>
    );
}

export default Loginform;
