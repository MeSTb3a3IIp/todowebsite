import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
function App () {
  //Для обычного todo без добавления регистрации и авторизации
  const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newTask, setNewTask] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);

  //Для измененного полностью будущего сайта todo с регистрацией и авторизацией
  const [Users, setUsers] = useState([]);

  const [NewLogin, setNewLogin] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [UncompleteList, setUncompleteList] = useState([]);
  const [CompleteList, setCompleteList] = useState([]);

  const [NewTitle, setNewTitle] = useState ('');
  const [NewDescription, setNewDescription] = useState ('');

  const [GoSignIn, setGoSignIn] = useState (true);
  const [GoLogIn, setGoLogIn] = useState (false);
  const [GoList, setGoList] = useState (false);

//добавление в localstorage нового пользователя 
  const handleAddNewUser = () => {
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
    setNewLogin ('');
    setNewPassword ('');
    setGoList(true);
    setCompleteList(Users[Users.length - 1].complete_list);
    setUncompleteList(Users[Users.length - 1].uncomplete_list);
    setGoSignIn(false);
  }
  const handleWarn = () => {
    alert('Требуется выполнить требования:\nДлина логина: 2-16 символов\nДлина пароля: 6-16 символов');
  }
  //проверка для подтверждения регистрации
  function correctSignUp () {
    if (NewPassword.length < 6 || NewPassword.length > 16 || NewLogin.length < 2 || NewLogin.length > 16) {
      return false;
    }
    for (var User in Users) {
      if (User.login === NewLogin) {
        return false;
      }
    }
    return true;
  }
  //проверка для входа
  function correctLogIn (login, password) {
    for (var User in Users) {
      if (User.login === login && User.password === password) {
        return true;
      }
    }
    return false;
  }
  //ещё никуда не добавленные измененные лямбда выражения для листа с регистрацией/авторизацией
  const handleAddInUncompleteList = login => {
    let newToDoObj = {
      title: NewTitle,
      task: NewDescription,
    };
    let updateList = UncompleteList;
    updateList.push (newToDoObj);
    setUncompleteList (updateList);
    Users[login].uncomplete_list = updateList;
    localStorage.setItem('users', JSON.stringify(Users));
  }
  const handleDeleteInUncompleteList = (login, index) => {
    let updateList = [...UncompleteList];
    updateList.splice (index, 1);
    setUncompleteList (updateList);
    Users[login].uncomplete_list = updateList;
    localStorage.setItem('users', JSON.stringify(Users));
  }
  const handleAddInCompleteList = (login, index) => {
    let updateList = [...CompleteList, ...UncompleteList[index]];
    setCompleteList (updateList);
    Users[login].complete_list = updateList;
    localStorage.setItem ('users', JSON.stringify (Users));
    handleDeleteInUncompleteList(login, index);
  }
  const handleDeleteInCompleteList = (login, index) => {
    let updateList = [...CompleteList];
    updateList.splice (index, 1);
    Users[login].complete_list = updateList;
    localStorage.setItem ('users', JSON.stringify (Users));
  }
//ниже лямбда выражения для обычного to do без регистрации и смс
  //добавление в лист незавершенных задач
  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newTask,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newToDoObj);
    setAllTodos (updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));


    setNewTask ('');
    setNewTodoTitle ('');
  };

  useEffect (() => {
    /* при добавлении регистрации и авторизации оставлю только это*/
    if (JSON.parse (localStorage.getItem ('users'))) {
      setUsers (JSON.parse (localStorage.getItem ('users')));
    }
    


    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodos) {
      setAllTodos (savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  }, []);
  //удаление из листа невыполненных задач
  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index, 1);
    
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setAllTodos (reducedTodos);
  };
  //удаление из листа выполненных задач
  const handleCompletedTodoDelete = index => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice (index, 1);
   
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (reducedCompletedTodos)
    );
    setCompletedTodos (reducedCompletedTodos);
  };
  //добавление из листа невыполненных задач в лист выполненных задач
  const handleComplete = index => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log (updatedCompletedList);
    setCompletedTodos (updatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );

    handleToDoDelete (index);
  };
/*
должно быть:

локал сторадж: 
ключ - users
значение - массив юзеров
данные юзера - логин пароль два списка
список - заголовок, задача

однако сейчас:

локал сторадж:
2 ключа для двух списков
список - заголовок, задача


*/
  return (
    //переделываю весь код для поддержки регистрации и авторизации
    //изначально был только блок с to do листом, если убрать блок регистрации и авторизации, то будет обычный to do без входа через логин
    <div>
      {/*не сделанный блок регистрации*/}
      <div className = { GoSignIn === true ? "SeeGoSignIn" : "UnSeeGoSignIn" }>
        <h1>Sign In</h1>
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
        <div className="Button">
            <button
              className="primary-btn"
              type="button"
              onClick = {correctSignUp() ? handleAddNewUser : handleWarn}>
              Create </button>
        </div>
        <div className="Button LogIn">
          <button
              className="primary-btn"
              type="button">
              Log In </button>
        </div>
      </div>
      {/*не сделанный блок Log In*/}
      <div className = { GoLogIn === true ? "SeeGoLogIn" : "UnSeeGoLogIn" }>

      </div>
      {/*не поддерживает авторизацию и регистрацию, для просмотра функционала листа без поддержки авторизации нужно убрать в div - className и удалить блок регистрации*/}
      <div className = { GoList === true ? "SeeGoList" : "UnSeeGoList" }>
        <h1>To Do website</h1>

        <div className="todo-wrapper">

          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title:</label>
              <input
                type="text"
                value={newTodoTitle}
                onChange={lol => setNewTodoTitle (lol.target.value)}
                placeholder="Add title"
              />
            </div>
            <div className="todo-input-item">
              <label>Task:</label>
              <input
                type="text"
                value={newTask}
                onChange={AAAAAA => setNewTask (AAAAAA.target.value)}
                placeholder="Add task"
              />
            </div>
            <div className="todo-input-item">
              <button
                className="primary-btn"
                type="button"
                onClick={handleAddNewToDo}
              >
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
              onClick={() => setIsCompletedScreen (false)}
            >
              To Do
            </button>
            <button
              className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
              onClick={() => setIsCompletedScreen (true)}
            >
              Completed
            </button>
          </div>
          <div className="todo-list">

            {isCompletedScreen === false &&
              allTodos.map ((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                  </div>
                  <div>
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => handleToDoDelete (index)}
                    />
                    <BsCheckLg
                      title="Completed?"
                      className=" check-icon"
                      onClick={() => handleComplete (index)}
                    />
                  </div>
                </div>
              ))}

            {isCompletedScreen === true &&
              completedTodos.map ((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p> <i>Completed at: {item.completedOn}</i></p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleCompletedTodoDelete (index)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;