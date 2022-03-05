import React from 'react';
import user from '../../utils/currentUser';
import './Header.scss';
import logo from '../../assets/img/icon.svg';
import axios from 'axios';

// Display the header

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

    // delete account function : triggered on click of the 'delete account' button
    const deleteAccount = () => {

        if (window.confirm("Vous êtes sur le point de supprimer votre compte, poursuivre?")) {   
                   
            axios.delete(`http://localhost:8080/api/auth/delete/${user.userId}`)
                .then(() => {
                    
                })
                .catch(err => console.log(err));
            window.location.replace('/login')  
        } else {
            return
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

                    <button onClick={() => {document.getElementById('userSettings').classList.toggle('show')}} className='dropDownTrigger'>                  
                        {user.firstName && user.firstName.substring(0, 1)}
                    </button>
                    
                    <div className='userSettings' id='userSettings'>
                        <a className="user" href="/user">
                            <p className='name'>{user.firstName} {user.lastName}</p>
                        </a>
                        <a className='logout' onClick={() => {localStorage.removeItem('userToken'); localStorage.removeItem('user')} } href="/login">Déconnexion</a>
                        <a id ='deleteAccount' className='deleteAccount' onClick={deleteAccount} href="#">Supprimer le Compte</a>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Header;
