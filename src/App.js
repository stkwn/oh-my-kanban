/** @jsxImportSource @emotion/react */
import './App.css';
import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import KanbanColumn from './KanbanColumn';

const COLUMN_BG_COLORS = {
  loading: "#E3E3E3",
  todo: "#C9AF97;",
  ongoing: " #FFE799",
  done: "#C0E8BA",
};

const DATA_STORE_KEY = 'kanban-data-store';
const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([
  ]);
  const [ongoingList, setOngoingList] = useState([
  ]);
  const [doneList, setDoneList] = useState( [
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

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
  }, 2000);
}, []);  
const handleSaveAll = () => {
  const data = JSON.stringify({ todoList, ongoingList, doneList });
  window.localStorage.setItem(DATA_STORE_KEY, data);
};

  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toLocaleString() },
      ...currentTodoList
    ]);
  }
  
  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {      
      return;    
    }    
    const updaters = {      
      [COLUMN_KEY_TODO]: setTodoList,      
      [COLUMN_KEY_ONGOING]: setOngoingList,      
      [COLUMN_KEY_DONE]: setDoneList    
    }    
    if (dragSource) {
      updaters[dragSource]((currentStat) =>        
      currentStat.filter((item) => !Object.is(item, draggedItem))      );
    }    
    if (dragTarget) {      
      updaters[dragTarget]((currentStat) => 
      [draggedItem, ...currentStat]);    
    }  
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
        {isLoading ? (
          <KanbanColumn
            title="Is Loading..."
            bgColor={COLUMN_BG_COLORS.loading}
          />
        ) : (
          <>
            <KanbanColumn
              canAddNew
              bgColor={COLUMN_BG_COLORS.todo}
              title="Handling"
              setDraggedItem={setDraggedItem}
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_TODO : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_TODO : null)
              }
              onAdd={handleSubmit}
              onDrop={handleDrop}
              cardList={todoList}
            />
            <KanbanColumn
              bgColor={COLUMN_BG_COLORS.ongoing}
              title="Ongoing"
              setDraggedItem={setDraggedItem}
              cardList={ongoingList}
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)
              }
              onDrop={handleDrop}
            >
            </KanbanColumn>
            <KanbanColumn
              bgColor={COLUMN_BG_COLORS.done}
              title="Done"
              setDraggedItem={setDraggedItem}
              cardList={doneList}
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_DONE : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_DONE : null)
              }
              onDrop={handleDrop}
            >
            </KanbanColumn>
          </>
        )}
      </KanbanBoard>
    </div>
  );
}

export default App;
