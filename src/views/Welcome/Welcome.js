import React from 'react';
import Header from '../../components/Header/Header';
import './Welcome.scss'
import illustration from '../../assets/img/Shape.svg';
import illustrationReflect from '../../assets/img/Reflex.svg';

const Welcome = () => {
    return (
        <div className='Welcome'>
            <Header />

            <div class='content'>

                <div className='hero'>
                    <h2 className='heroTxt'>Rejoignez un réseau de <span>600</span> collaborateurs</h2>

                    <p className='heroSubtxt'>En 2022, Groupomania met en place un réseau social interne afin de faciliter les échanges entre employés.</p>

                    <div className='heroSignupLoginCtn'>
                        <button className='signup'>Inscription</button>
                        <p className='login'>Vous avez déjà un compte ? <a>Connexion</a></p>
                    </div>

                </div>

                <div className='illustration'>
                    <img className='square' src={illustration} alt='illustration Groupomania'/>
                    <img className='reflect' src={illustrationReflect} alt='illustration Groupomania reflet'/>
                </div>

            </div>

        </div>
    );
}

export default Welcome;
