import React, { useEffect } from 'react';
import Day from '../day/Day';
import moment from 'moment';

import './week.scss';

const Week = ({ weekDates, events, onCreate, onDelete }) => {
  return (
    <div className="calendar__week" onClick={onCreate}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
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
