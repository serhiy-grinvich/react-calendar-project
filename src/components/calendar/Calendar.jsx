import React, { Component } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import { fetchEvents } from '../../gateway/eventsGateway';

import './calendar.scss';

class Calendar extends Component {
  state = {
    events: [],
    eventStartDate: '',
    eventStartTime: '',
  };

  componentDidMount() {
    this.onUpdateEventsList();
  }

  onUpdateEventsList = () => {
    fetchEvents().then((eventsData) => {
      const eventsWithDateObj = eventsData.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }));
      this.setState({ events: eventsWithDateObj });
    });
  };

  onOpenModal = (e) => {
    this.setState({
      eventStartTime: e.target.dataset.time,
      eventStartDate: e.target.parentNode.dataset.day,
    });
    this.props.onOpenModal();
  };

  onCloseModal = () => {
    this.setState({
      eventStartTime: '',
      eventStartDate: '',
    });
    this.props.onCloseModal();
  };

  onDeleteEvent = () => {
    this.onUpdateEventsList();
  };

  render() {
    const { weekDates, onOpenModal, onCloseModal, isModalActive } = this.props;
    const { eventStartDate, eventStartTime, events } = this.state;
    const currentDate = new Date();
    console.log(this.state);

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={events}
              onOpenModal={this.onOpenModal}
              onDelete={this.onDeleteEvent}
            />
            {isModalActive && (
              <Modal
                onClose={this.onCloseModal}
                eventStartDate={eventStartDate}
                eventStartTime={eventStartTime}
                onUpdateEventsList={this.onUpdateEventsList}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
