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

    
    function handleCheckNewToDo () {
        
        if(NewTitle.trimStart() !== '')
        {
            return true;
        }
        return false;
    }
    const handleAddInUncompleteList = () => {
        let todo= {
          title: NewTitle,
          task: NewTask,
        };
        let updateList = [...UncompleteList];
        updateList.push (todo);
        setUncompleteList (updateList);
        Users[Index].uncomplete_list = updateList;
        localStorage.setItem('users', JSON.stringify(Users));
        setNewTitle ('');
        setNewTask ('');
        
    }
    const handleErrorToDo = () => {
        alert('Для добавления задачи необходимо написать её заголовок');
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
    const [currentList, setCurrentList] = useState(null)
    const [currentTodo, setCurrentTodo] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)
    function dragStartHandler(e, List, todo, index) {
        setCurrentList(List)
        setCurrentTodo(todo)
        setCurrentIndex(index)
    }
    function dragEndHandler(e) {
        e.preventDefault()
    }
    function dragOverHandler(e) {
        e.preventDefault()
    }
    function dragLeaveHandler(e) {
        e.preventDefault()

    }
    function dropHandler(e, List, todo) {
        e.preventDefault()
        if(List !== currentList)
        {
            currentList.splice(currentIndex, 1)
            List.push(currentTodo)
        
            if(List == UncompleteList)
            {
                setCompleteList(currentList)
                setUncompleteList(List)
                Users[Index].uncomplete_list = List;
                Users[Index].complete_list = currentList;
            }
            else if(List == CompleteList)
            {
                setUncompleteList(currentList)
                setCompleteList(List)
                Users[Index].uncomplete_list = currentList;
                Users[Index].complete_list = List;
                
            }
            
            localStorage.setItem ('users', JSON.stringify (Users));
            setCurrentList(null)
            setCurrentIndex(null)
            setCurrentTodo(null)
        }
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
        <div>
            <h1>Welcome {Login}</h1>

            <div className="block-main">
                <div className="block-input-button">
                    <div className="block-out">
                        <a className="a" href = "/SignIn">Sign Out</a>
                    </div>
                    <div className="block-input">
                        <div className="block-input-title">
                            <label className = "block-label">Title:</label>
                            <input
                                className = "input"
                                type="text"
                                value={NewTitle}
                                onChange={Title => setNewTitle (Title.target.value)}
                                placeholder="Add title"
                            />
                        </div>
                        <div className="block-input-task">
                            <label className = "block-label">Task:</label>
                            <input
                                className = "input"
                                type="text"
                                value={NewTask}
                                onChange={Task => setNewTask (Task.target.value)}
                                placeholder="Add task"
                            />
                        </div>
                        <div className="block-add-todo">
                            <button
                                className="primary-btn"
                                type="button"
                                onClick={handleCheckNewToDo()? handleAddInUncompleteList : handleErrorToDo}>
                            Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className= "block-uncomplete-list-name">
                    <h3 className='h3'>UncompleteList</h3>
                </div>
                <div className = "block-uncomplete-list-items">
                    { UncompleteList.map ((todo, index) => (
                    <div className="block-uncomplete-list-item" draggable={"true"} key={index}
                        onDragStart={(e)=>dragStartHandler(e, UncompleteList, todo, index)}
                        onDragEnd={(e)=>dragEndHandler(e) }
                        onDragOver={(e)=>dragOverHandler(e) }
                        onDragLeave={(e)=>dragLeaveHandler(e) }
                        onDrop={(e)=>dropHandler(e, UncompleteList, todo) }
                    >
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
            
                <div className = "block-complete-list-name">
                    <h3 className='h3'>CompleteList</h3>
                </div>
                <div className = "block-complete-list-items">
                { CompleteList.map ((todo, index) => (
                    <div className = "block-complete-list-item" draggable={"true"} key={index}
                        onDragStart={(e)=>dragStartHandler(e, CompleteList, todo, index)}
                        onDragEnd={(e)=>dragEndHandler(e) }
                        onDragOver={(e)=>dragOverHandler(e) }
                        onDragLeave={(e)=>dragLeaveHandler(e) }
                        onDrop={(e)=>dropHandler(e, CompleteList, todo) }
                    >
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
}