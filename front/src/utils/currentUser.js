let user = '';

if (localStorage.getItem('user')) {
    user = {
        userId : JSON.parse(localStorage.getItem('user')).userId,
        firstName: JSON.parse(localStorage.getItem('user')).firstName,
        lastName: JSON.parse(localStorage.getItem('user')).lastName,
        email: JSON.parse(localStorage.getItem('user')).email,
        password: JSON.parse(localStorage.getItem('user')).password,
    }
}

export default user;