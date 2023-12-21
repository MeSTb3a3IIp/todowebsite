import React, {useState, useEffect} from 'react';
import './SignUp.css';
function SignUp () {
    const [Users, setUsers] = useState([]);

    const [NewLogin, setNewLogin] = useState('');
    const [NewPassword, setNewPassword] = useState('');

    const [Ref, setRef] = useState('');

    const handleAddNewUser = () => {
        let user = JSON.parse(localStorage.getItem ('user'));
        if (!user || user.length > 0) { 
          setRef('/ToDoList');
        }
        
        let NewUser = {
            login: NewLogin,
            password: NewPassword,
            uncomplete_list: [],
            complete_list: []
        };
        let updateUsers = [...Users];
        updateUsers.push (NewUser);
        setUsers (updateUsers);
        localStorage.setItem ('users', JSON.stringify (updateUsers));
        localStorage.setItem ('user', JSON.stringify (NewLogin));
        setNewLogin ('');
        setNewPassword ('');

    }
    const handleWarnSignUp = () => {
        setRef('/');
        alert('Требуется выполнить требования:\nЛогин должен быть уникальным\nДлина логина: 2-16 символов\nДлина пароля: 6-16 символов');
    }

    function correctSignUp () {
        if (NewPassword.trimStart().trimEnd().length > 16 || NewPassword.trimStart().trimEnd().length <  6 || NewLogin.trimStart().trimEnd().length < 2 || NewLogin.trimStart().length  > 16) {
            return false;
        }
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].login === NewLogin) {
                return false;
            }
        }
        return true;
    }
    useEffect (() => {
        localStorage.setItem ('user', JSON.stringify (''));
        let users = JSON.parse (localStorage.getItem ('users'))
        if (users) {
            setUsers (users);
        }
    }, []);

    return (
      <div>
          <div className = "Up">
              <h1>Sign Up</h1>
              <div className="Data">
                  <label>Login:</label>
                  <input
                      type="text"
                      value={NewLogin}
                      onChange={e => setNewLogin (e.target.value)}
                      placeholder="Set login" />
              </div>
              <div className="Data">
                  <label>Password:</label>
                  <input
                      type="text"
                      value={NewPassword}
                      onChange={e => setNewPassword (e.target.value)}
                      placeholder="Set password" />
              </div>
              
              <div className="Create">
                  <a
                      className='ref bottom-left'
                      onClick = { correctSignUp() ? handleAddNewUser : handleWarnSignUp}
                      href = {Ref}
                      >
                      Create 
                  </a>
              </div>
              <div className="SignUp">
                  <a  className='ref top-right' href = "/SignIn">Sign In?</a>
              </div>
          </div>
      </div>
    );
}

export default SignUp;