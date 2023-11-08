import React, {useState, useEffect} from 'react';
import './ToDoList.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

export default function ToDoList () {
    const [Users, setUsers] = useState([]);
    const [Index, setIndex] = useState(0);
    const [Login, setLogin] = useState('');

    const [UncompleteList, setUncompleteList] = useState([]);
    const [CompleteList, setCompleteList] = useState([]);

    const [NewTitle, setNewTitle] = useState ('');
    const [NewTask, setNewTask] = useState ('');

    const [isCompletedScreen, setIsCompletedScreen] = useState (false);

    const handleAddInUncompleteList = () => {
        let newToDo= {
          title: NewTitle,
          task: NewTask,
        };
        let updateList = [...UncompleteList];
        updateList.push (newToDo);
        setUncompleteList (updateList);
        Users[Index].uncomplete_list = updateList;
        localStorage.setItem('users', JSON.stringify(Users));
        setNewTitle ('');
        setNewTask ('');
        
    }
    const handleDeleteInUncompleteList = (index) => {
        let updateList = [...UncompleteList];
        updateList.splice (index, 1);
        setUncompleteList (updateList);
        Users[Index].uncomplete_list = updateList;
        localStorage.setItem('users', JSON.stringify(Users));
    }
    const handleAddInCompleteList = (index) => {
        let updateList = [...CompleteList, UncompleteList[index]];
        setCompleteList (updateList);
        Users[Index].complete_list = updateList;
        localStorage.setItem ('users', JSON.stringify (Users));
        handleDeleteInUncompleteList(index);
    }
    const handleDeleteInCompleteList = (index) => {
        let updateList = [...CompleteList];
        updateList.splice (index, 1);
        setCompleteList (updateList);
        Users[Index].complete_list = updateList;
        localStorage.setItem ('users', JSON.stringify (Users));
      }
    useEffect (() => {
        
        let log = JSON.parse (localStorage.getItem ('user'));
        console.log(log);
        if(log) {
            setLogin (log);
        }
        let users = JSON.parse (localStorage.getItem ('users'))
        if(users) {
        
            setUsers (users);
            for (var i = 0; i < users.length; i++)
            {
                if (users[i].login === log)
                {
                    setIndex (i);
                    setUncompleteList ([...users[i].uncomplete_list]);
                    setCompleteList ([...users[i].complete_list]);
                }
            }
        }
    }, []);
    return (
        <div className = "SeeGoList">
            <h1>Welcome {Login}</h1>

            <div className="todo-wrapper">
                <div className="Button">
                    <a className="a" href = "/SignIn">Sign Out</a>
                </div>
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={NewTitle}
                            onChange={Title => setNewTitle (Title.target.value)}
                            placeholder="Add title"
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>Task:</label>
                        <input
                            type="text"
                            value={NewTask}
                            onChange={Task => setNewTask (Task.target.value)}
                            placeholder="Add task"
                        />
                    </div>
                    <div className="todo-input-item">
                        <button
                            className="primary-btn"
                            type="button"
                            onClick={handleAddInUncompleteList}>
                        Add
                        </button>
                    </div>
                </div>
                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
                        onClick={() => setIsCompletedScreen (false)}>
                        To Do
                    </button>
                    <button
                        className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
                        onClick={() => setIsCompletedScreen (true)}>
                        Completed
                    </button>
                </div>
                <div className = "UncompleteList">
                    <div className= "UncompleteList-name" >
                        UncompleteList
                    </div>
                    { UncompleteList.map ((todo, index) => (
                    <div className="UncompleteList-item" key={index}>
                        <div>
                            <h3>{todo.title}</h3>
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                title="Delete?"
                                className="icon"
                                onClick={() => handleDeleteInUncompleteList (index)}
                            />
                            <BsCheckLg
                                title="Completed?"
                                className="check-icon"
                                onClick={() => handleAddInCompleteList (index)}
                            />
                        </div>
                    </div>
                    ))}
                </div>
                <div className='CompleteList'>
                    <div className= "CompleteList-name">
                        CompleteList
                    </div>
                    { Complete.map ((todo, index) => (
                    <div className="CompleteList-item" key={index}>
                        <div>
                            <h3>{todo.title}</h3>
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="icon"
                                onClick={() => handleDeleteInCompleteList (index)}
                            />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
};