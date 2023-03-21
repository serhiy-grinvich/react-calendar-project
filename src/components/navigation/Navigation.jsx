import React from 'react';
import moment from 'moment';
import './navigation.scss';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates, currentDate }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div className="calendar__day-label day-label" key={dayDate}>
          <span
            className={`day-label__day-name ${
              moment(currentDate).format('MMM Do YY') ===
              moment(dayDate).format('MMM Do YY')
                ? 'day-label__day-name_current'
                : ''
            }`}
          >
            {days[dayDate.getDay()]}
          </span>
          <span
            className={`day-label__day-number ${
              moment(currentDate).format('MMM Do YY') ===
              moment(dayDate).format('MMM Do YY')
                ? 'day-label__day-number_current'
                : ''
            }`}
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;

// add key to list elem in render
