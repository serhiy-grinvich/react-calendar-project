import React, { useState } from 'react';
import DeleteEventBtn from './DeleteEventBtn';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, onDelete }) => {
  const eventStyle = {
    height,
    marginTop,
  };
  const [isDeleteBtnVisible, toggleDeleteBtnVisibility] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e);
    toggleDeleteBtnVisibility(!isDeleteBtnVisible);
    setMousePosition([e.clientX, e.clientY]);
  };

  return (
    <div
      style={eventStyle}
      className="event"
      data-id={id}
      onClick={handleClick}
      // onContextMenu={(e) => {
      //   e.preventDefault();
      //   handleClick(e);
      // }}
      // onMouseLeave={() => toggleDeleteBtnVisibility(false)}
    >
      {isDeleteBtnVisible ? (
        <DeleteEventBtn
          mousePosition={mousePosition}
          id={id}
          onDelete={onDelete}
        />
      ) : null}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
