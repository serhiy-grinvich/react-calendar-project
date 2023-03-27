import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/eventsGateway';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, onDelete }) => {
  const eventStyle = {
    height,
    marginTop,
  };
  const [isDeleteBtnVisible, toggleDeleteBtnVisibility] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleDeleteBtnVisibility(!isDeleteBtnVisible);
  };

  const deleteEventHandler = () => {
    deleteEvent(id).then(() => onDelete());
  };

  return (
    <div
      style={eventStyle}
      className="event"
      data-id={id}
      onClick={handleClick}
      onMouseLeave={() => toggleDeleteBtnVisibility(false)}
    >
      <button
        className={`delete-event-btn ${!isDeleteBtnVisible && 'hidden'} `}
        onClick={deleteEventHandler}
      >
        <i className="fas fa-trash delete-event-btn__icon"></i> Delete
      </button>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
