import React, { Component } from 'react';

import { setDefaultEventTime } from '../../utils/dateUtils';
import { createNewEvent } from '../../gateway/eventsGateway';

import './modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDate: '',
      timeFrom: '',
      timeTo: '',
      title: '',
      description: '',
    };
  }
  componentDidMount() {
    const { eventStartDate, eventStartTime } = this.props;
    this.setState(setDefaultEventTime(eventStartDate, eventStartTime));
  }

  createEventHandler = (e) => {
    e.preventDefault();
    const { eventDate, timeFrom, timeTo, title, description } = this.state;
    const newTask = {
      title,
      description,
      dateFrom: new Date(`${eventDate} ${timeFrom}`),
      dateTo: new Date(`${eventDate} ${timeTo}`),
    };
    createNewEvent(newTask).then(() => {
      this.props.onClose();
      this.props.onUpdateEventsList();
    });
  };

  render() {
    const { eventDate, timeFrom, timeTo, title, description } = this.state;

    console.log(this.state);
    console.log(this.props);
    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button
              className="create-event__close-btn"
              onClick={this.props.onClose}
            >
              +
            </button>
            <form className="event-form" onSubmit={this.createEventHandler}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                value={title}
                onChange={(e) => this.setState({ title: e.target.value })}
                required
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={eventDate}
                  onChange={(e) => this.setState({ eventDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  value={timeFrom}
                  // step="900"
                  onChange={(e) => this.setState({ timeFrom: e.target.value })}
                  required
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  value={timeTo}
                  // step="900"
                  onChange={(e) => this.setState({ timeTo: e.target.value })}
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                value={description}
                onChange={(e) => this.setState({ description: e.target.value })}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
