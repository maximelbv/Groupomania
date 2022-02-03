import React from 'react';
import './Header.scss';
import logo from '../../assets/img/icon.svg'

const Header = () => {
    return (
        <div className='Header'>

            <a href='#' className='logo'>
                <img className='logoImg' src={logo} alt='Groupomania'/>
                <p className='logotxt'>Groupomania</p>
            </a>

        </div>
    );
}

export default Header;
