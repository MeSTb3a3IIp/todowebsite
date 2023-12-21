import React, {useState, useEffect} from 'react';
import './SignIn.css';
function SignIn () {
    const [Users, setUsers] = useState([]);

    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');


    const handleWarnSignIn = () => {
        alert('Ошибка авторизации, проверьте введённые данные');
    }
    const handleSetLogin = () => {
        localStorage.setItem ('user', JSON.stringify (Login));
    }
    function correctLoginPassword () {
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].login === Login && Users[i].password === Password) {
                return true;
            }
        }
        return false;
    }
    useEffect (() => {
        localStorage.setItem ('user', JSON.stringify (''));
        let users = JSON.parse (localStorage.getItem ('users'));
        if (users) {
          setUsers (users);
        }
    }, []);

    return (
        <div className = "In">
            <h1>Sign In</h1>
            <div className="Data">
                <label>Login:</label>
                    <input
                    type="text"
                    value={Login}
                    onChange={e => setLogin (e.target.value)}
                    placeholder="Set login" />
            </div>
            <div className="Data">
                <label>Password:</label>
                    <input
                    type="text"
                    value={Password}
                    onChange={e => setPassword (e.target.value)}
                    placeholder="Set password" />
            </div>
            <div className="Go">
                <a
                    className='ref bottom-left'
                    href = {correctLoginPassword() ? "/ToDoList" : "/SignIn"}
                    onClick = {correctLoginPassword() ? handleSetLogin : handleWarnSignIn}>
                    Go 
                </a>
            </div>
            <div className="SignUp">
                <a  className='ref top-right' href = "/">Sign Up?</a>
            </div>
        </div>
    );
}

export default SignIn;