import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss'
import logo from '../../assets/img/icon-left-font-monochrome-black.svg';
import illustration from '../../assets/img/undraw_in_the_office_re_jtgc.svg';

// Hero component: display the blue box withe the illustration on the login and signup views
// a 'hero' in UI design is a sort of header that informs the user what he is browsing

const Hero = () => {
    return (
        <div className='Hero'>

            <div className='header'>
                <img className='logo' src={logo} />
                <h2 className='txt'>Rejoignez un réseau <br/>de 600 collaborateurs</h2>
            </div>

            <img src={illustration} className='illustration' />

        </div>
    );
}

export default Hero;
