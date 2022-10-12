/** @jsxImportSource @emotion/react */
import './App.css';
import React, { useState } from 'react';
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

const KanbanCard = ({ title, status }) => {
  return (
    <li css={kanbanCardStyles}>
      <div css={kanbanCardTitleStyles}>{title}</div>
      <div
        css={css`
          text-align: right;
          font-size: 0.8rem;
          color: #333;
        `}
      >
        {status}
      </div>
    </li>
  );
};
const KanbanNewCard = ({onSubmit}) => {
  const [title, setTitle] = useState('');
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
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  );
};
const COLUMN_BG_COLORS = {
  todo: "#C9AF97;",
  ongoing: " #FFE799",
  done: "#C0E8BA",
};


function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "TodoList 1", status: "22-05-22 18:15" },
    { title: "TodoList 3", status: "23-05-22 18:17" },
    { title: "TodoList 5", status: "23-05-22 18:18" },
    { title: "TodoList 7", status: "23-05-22 18:19" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "TodoList 4", status: "22-05-22 18:15" },
    { title: "TodoList 6", status: "22-05-22 18:15" },
    { title: "TodoList 2", status: "22-05-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState( [
  { title: "TodoList 0", status: "22-05-22 18:15" },
  { title: "TodoList 10", status: "22-05-22 18:15" },
  ]);

  const handleAdd = (evt => setShowAdd(true));
  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ]);
    // setShowAdd(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TASKS BOARD</h1>
        <img src="./logo300.png" className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
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
      </KanbanBoard>
    </div>
  );
}

export default App;
