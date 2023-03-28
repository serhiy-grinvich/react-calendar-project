import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import { fetchEvents } from '../../gateway/eventsGateway';
import './calendar.scss';

const Calendar = ({ weekDates, onOpenModal, onCloseModal, isModalActive }) => {
  const [events, setEventsList] = useState([]);
  const [eventStartFrom, setEventStart] = useState({
    eventStartDate: '',
    eventStartTime: '',
  });

  useEffect(() => {
    onUpdateEventsList();
  }, []);

  const { eventStartDate, eventStartTime } = eventStartFrom;

  const onUpdateEventsList = () => {
    fetchEvents().then((eventsData) => {
      const eventsWithDateObj = eventsData.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }));
      setEventsList(eventsWithDateObj);
    });
  };

  const onOpenModalWindow = (e) => {
    setEventStart({
      eventStartTime: e.target.dataset.time,
      eventStartDate: e.target.parentNode.dataset.day,
    });
    onOpenModal();
  };

  const onCloseModalWindow = () => {
    setEventStart({
      eventStartTime: '',
      eventStartDate: '',
    });
    onCloseModal();
  };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            onOpenModal={onOpenModalWindow}
            onDelete={onUpdateEventsList}
          />
          {isModalActive && (
            <Modal
              onClose={onCloseModalWindow}
              eventStartDate={eventStartDate}
              eventStartTime={eventStartTime}
              onUpdateEventsList={onUpdateEventsList}
              eventsList={events}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isModalActive: PropTypes.bool.isRequired,
};
