/** @jsxImportSource @emotion/react */
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import {css} from '@emotion/react';



const KanbanBoard = ({ children }) => (
  <main
    css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `}
  >
    {children}
  </main>
);

const KanbanColumn =({children, bgColor, title}) => {
  return (
    <section
      css={css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};

        & > h2 {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;

          & > button {
            float: right;
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem;
            border: 0;
            border-radius: 1rem;
            height: 1.8rem;
            line-height: 1rem;
            font-size: 1rem;
          }
        }

        & > ul{
          flex: 1;
          flex-basis: 0;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }
      `}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover {
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2), inset 0 1px #fff;
  }
`;

const kanbanCardTitleStyles = css`
  min-height: 3rem;

  & > input[type="text"] {
    width: 80%;
  }
`;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

const KanbanCard = ({ title, status }) => {
  const [displayTime,setDisplayTime] = useState(null);
    useEffect(() => {
      const updateDisplayTime = () => {
        const timePassed = new Date() - new Date(status);
        let relativeTime = "Just Now";
        if (MINUTE <= timePassed && timePassed < HOUR) {
          relativeTime = `${Math.ceil(timePassed / MINUTE)} minutes ago`;
        } else if (HOUR <= timePassed && timePassed < DAY) {
          relativeTime = `${Math.ceil(timePassed / HOUR)} hours ago`;
        } else if (DAY <= timePassed) {
          relativeTime = `${Math.ceil(timePassed / DAY)} days ago`;
        }
        setDisplayTime(relativeTime);
      };
      const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
      updateDisplayTime();
      return function cleanup() {
        clearInterval(intervalId);
      };
    }, [status]);
  return (
    <li css={kanbanCardStyles}>
      <div css={kanbanCardTitleStyles} >{title}</div>
      <div
        css={css`
          text-align: right;
          font-size: 0.8rem;
          color: #333;
        `}
        title ={status}
      >
        {displayTime}
      </div>
    </li>
  );
};
const KanbanNewCard = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const inputElem = useRef(null);
  useEffect(()=>{
    inputElem.current.focus()
  },[])
  const handleChange = e => setTitle(e.target.value);
  const handleKeyDown = e =>{
    if (e.key ==='Enter') {
      onSubmit(title)
    }
  }
  return (
    <li css={kanbanCardStyles}>
      <h3>Add a new task</h3>
      <div css={kanbanCardTitleStyles}>
        <input type="text" value={title} ref={inputElem} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  );
};
const COLUMN_BG_COLORS = {
  loading: "#E3E3E3",
  todo: "#C9AF97;",
  ongoing: " #FFE799",
  done: "#C0E8BA",
};

const DATA_STORE_KEY = 'kanban-data-store';

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([
    { title: "TodoList 1", status: "2022-05-22 18:15" },
    { title: "TodoList 3", status: "2022-05-22 18:17" },
    { title: "TodoList 5", status: "2022-05-22 18:18" },
    { title: "TodoList 7", status: "2022-05-22 18:19" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "TodoList 4", status: "2022-05-22 18:15" },
    { title: "TodoList 6", status: "2022-05-22 18:15" },
    { title: "TodoList 2", status: "2022-05-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState( [
  { title: "TodoList 0", status: "2022-05-22 18:15" },
  { title: "TodoList 10", status: "2022-05-22 18:15" },
  ]);

  useEffect(() => {
  const data = window.localStorage.getItem(DATA_STORE_KEY);
  setTimeout(() => {
    if (data) {
      const kanbanColumnData = JSON.parse(data);
      setTodoList(kanbanColumnData.todoList);
      setOngoingList(kanbanColumnData.ongoingList);
      setDoneList(kanbanColumnData.doneList);
    }
    setIsLoading(false);
  }, 3000);
}, []);  

  const handleAdd = (evt => setShowAdd(true));
  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toString() },
      ...currentTodoList
    ]);
    setShowAdd(false)
  }
  const handleSaveAll = () => {
    const data = JSON.stringify({ todoList, ongoingList, doneList });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TASKS BOARD
          <button onClick={handleSaveAll}>Save all tasks</button>
        </h1>
        <img src="./logo300.png" className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        {isLoading ?(
          <KanbanColumn title="Is Loading..." bgColor={COLUMN_BG_COLORS.loading} />) :
        (<>
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.todo}
          title={
            <>
              To Do
              <button onClick={handleAdd} disabled={showAdd}>
                Add a new card
              </button>
            </>
          }
          >
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map((props) => (
            <KanbanCard key={props.title} {...props} />
            ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="Ongoing">
          {ongoingList.map((props) => (
            <KanbanCard key={props.title} {...props} />
            ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="Done">
          {doneList.map((props) => (
            <KanbanCard key={props.title} {...props} />
            ))}
        </KanbanColumn>
        </>)}
      </KanbanBoard>
    </div>
  );
}

export default App;
