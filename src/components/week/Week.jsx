import React from 'react';
import moment from 'moment';

import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, onOpenModal, onDelete }) => {
  return (
    <div className="calendar__week" onClick={onOpenModal}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart).setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={moment(dayStart).format('YYYY-MM-DD')}
            dayEvents={dayEvents}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default Week;
