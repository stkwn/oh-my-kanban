
import './App.css';
import React, { useState } from 'react';

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
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
    <li className="kanban-card">
      <h3>Add a new task</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  );
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
        <img src='./logo300.png' className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>
            To Do 
            <button onClick={handleAdd} disabled={showAdd}>Add a new card</button>
          </h2>
          <ul>
            {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
            {todoList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>Ongoing</h2>
          <ul>
            {ongoingList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>Done</h2>
          <ul>
            {doneList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
