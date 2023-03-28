import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { setDefaultEventTime } from '../../utils/dateUtils';
import { createNewEvent } from '../../gateway/eventsGateway';
import './modal.scss';

const Modal = ({
  eventStartDate,
  eventStartTime,
  onClose,
  onUpdateEventsList,
}) => {
  const [event, setEvent] = useState({
    eventDate: '',
    timeFrom: '',
    timeTo: '',
    title: '',
    description: '',
  });
  const { eventDate, timeFrom, timeTo, title, description } = event;

  useEffect(() => {
    setEvent({
      ...event,
      ...setDefaultEventTime(eventStartDate, eventStartTime),
    });
  }, []);

  const createEventHandler = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      // use .replace( ) for  solve parsing date problems in Safari
      dateFrom: `${eventDate.replace(/-/g, '/')} ${timeFrom}`,
      dateTo: `${eventDate.replace(/-/g, '/')} ${timeTo}`,
    };
    createNewEvent(newTask).then(() => {
      console.log(newTask);
      onClose();
      onUpdateEventsList();
    });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onClose}>
            +
          </button>
          <form className="event-form" onSubmit={createEventHandler}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={eventDate}
                onChange={(e) =>
                  setEvent({ ...event, eventDate: e.target.value })
                }
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={timeFrom}
                // step="900"
                onChange={(e) =>
                  setEvent({ ...event, timeFrom: e.target.value })
                }
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={timeTo}
                // step="900"
                onChange={(e) => setEvent({ ...event, timeTo: e.target.value })}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
