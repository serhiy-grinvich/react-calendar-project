import React, { Component } from 'react';
import moment from 'moment';
import events from '../../gateway/events';
import { formatTimeWithZero } from '../../utils/dateUtils';

import './modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      timeFrom: '',
      timeTo: '',
    };
  }
  componentDidMount() {
    this.setState(this.setDefaultEventTime());
  }

  setDefaultEventTime = () => {
    const { eventDate, eventStartTime } = this.props;
    const defaultDate = {};
    defaultDate.currentDate = eventDate
      ? eventDate
      : moment().format('YYYY-MM-DD');
    defaultDate.timeFrom = eventStartTime
      ? `${formatTimeWithZero(eventStartTime - 1)}:00`
      : moment().format('HH:mm');
    defaultDate.timeTo = eventStartTime
      ? `${formatTimeWithZero(eventStartTime)}:00`
      : moment().add(1, 'hours').format('HH:mm');

    return defaultDate;
  };

  createEventHandler = (e) => {
    e.preventDefault();
    const { title, description } = e.target;
    const { currentDate, timeFrom, timeTo } = this.state;
    const newTask = {
      id: Math.random(),
      title: title.value,
      description: description.value,
      dateFrom: new Date(`${currentDate} ${timeFrom}`),
      dateTo: new Date(`${currentDate} ${timeTo}`),
    };
    events.push(newTask);
    this.props.onClose();
  };

  render() {
    // console.log(this.state);
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
                required
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={this.state.currentDate}
                  onChange={(e) =>
                    this.setState({ currentDate: e.target.value })
                  }
                  required
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  value={this.state.timeFrom}
                  // step="900"
                  onChange={(e) => this.setState({ timeFrom: e.target.value })}
                  required
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  value={this.state.timeTo}
                  // step="900"
                  onChange={(e) => this.setState({ timeTo: e.target.value })}
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
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
