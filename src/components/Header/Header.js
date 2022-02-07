import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/img/icon.svg'

const Header = () => {
    return (
        <div className='Header'>
            <div className='headerContainer'>

                <a href='#' className='logo'>
                    <img className='logoImg' src={logo} alt='Groupomania'/>
                    <p className='logotxt'>Groupomania</p>
                </a>

                <div className='loginSignupBtns'>
                    <Link to="/login" className='login'>Connexion</Link>
                    <Link to="/signup" className='signup'>Inscription</Link>
                </div>

            </div>
        </div>
    );
}

export default Header;
