/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { kanbanCardStyles, kanbanCardTitleStyles } from "./KanbanCard";
import { css } from "@emotion/react";

export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState("");
  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []);
  const handleChange = (e) => setTitle(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(title);
    }
  };
  return (
    <li css={kanbanCardStyles}>
      <h3>Add a newnew task</h3>
      <div css={kanbanCardTitleStyles}>
        <input
          type="text"
          value={title}
          ref={inputElem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  );
}
