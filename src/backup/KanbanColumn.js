import React, {useState} from 'react';
import { css } from '@emotion/react';
import KanbanCard from './kanbanCard';
import KanbanNewCard from './KanbanNewCard';

  const kanbanColumnStyles = css`
    flex: 1 1;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 1rem;

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

    & > ul {
      flex: 1;
      flex-basis: 0;
      margin: 1rem;
      padding: 0;
      overflow: auto;
    }
  `;

export default function KanbanColumn({ 
  bgColor, 
  canAddNew = false,
  cardList =[],
  onAdd,
  title, 
  onDrop,
  setDraggedItem, 
  setIsDragSource = () => { }, 
  setIsDragTarget = () => { }, 
}) {
  const [showAdd, setShowAdd] = useState(false);
    const handleAdd = (evt) => setShowAdd(true);
    const handleSubmit = (newCard) => {
      onAdd && onAdd(newCard);
      setShowAdd(false);
    };

  return (
    <section
      css={css`
      ${kanbanColumnStyles} 
      background-color: ${bgColor};
      `}
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      } }
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      } }
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      } }
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      } }
    >
      <h2>
        {title}
        {canAddNew && 
          (<button onClick={handleAdd} disabled={showAdd}>Add a new Card </button>)
        }
      </h2>
      <ul>
        {cardList.map((props)=>(
          <KanbanCard
          key={props.title}
          onDragStart ={()=>setDraggedItem && setDraggedItem(props)}
          {...props}
          />
        ))}
      </ul>
    </section>
  );
}
