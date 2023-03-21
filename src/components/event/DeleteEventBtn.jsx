import React from 'react';
import events from '../../gateway/events';

const DeleteEventBtn = (props) => {
  const [x, y] = props.mousePosition;

  const deleteEventHandler = (id) => {
    console.log(events);
    const updatedEvents = events.filter((elem) => elem.id !== id);
    events.splice(0, events.length, ...updatedEvents);
    console.log(events);
    props.onDelete();
  };

  return (
    <button
      className="delete-event-btn "
      onClick={() => deleteEventHandler(props.id)}
    >
      <i className="fas fa-trash"></i> Delete
    </button>
  );
};

export default DeleteEventBtn;
