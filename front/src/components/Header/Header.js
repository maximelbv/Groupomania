import React from 'react';
import user from '../../utils/currentUser';
import './Header.scss';
import logo from '../../assets/img/icon.svg';


const Header = () => {

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropDownTrigger')) {
            var dropdowns = document.getElementsByClassName("userSettings");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div className='Header'>
            <div className='headerContainer'>

                <a href='/' className='logo'>
                    <img className='logoImg' src={logo} alt='Groupomania'/>
                    <p className='logotxt'>Groupomania</p>
                </a>


                <div className='dropDown'>

                    <button onClick={() => {document.getElementById('userSettings').classList.toggle('show')}} className='dropDownTrigger'></button>
                    
                    <div className='userSettings' id='userSettings'>
                        <a className="user" href="/user">
                            <p className='name'>{user.firstName} {user.lastName}</p>
                        </a>
                        <a className='settings' href="#">Paramètres</a>
                        <a className='logout' href="#">Déconnexion</a>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Header;
