import React from 'react';
import moment from 'moment';

import { days, isCurrentDate } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div className="calendar__day-label day-label" key={dayDate}>
          <span
            className={`day-label__day-name ${
              isCurrentDate(dayDate) && 'day-label__day-name_current'
            }`}
          >
            {days[dayDate.getDay()]}
          </span>
          <span
            className={`day-label__day-number ${
              isCurrentDate(dayDate) && 'day-label__day-number_current'
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
