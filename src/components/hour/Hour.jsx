import React from 'react';

import Event from '../event/Event';

import './hour.scss';

import { formatTimeWithZero } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, onDelete }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {/* if no events in the current hour nothing will render here */}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatTimeWithZero(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatTimeWithZero(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default Hour;
