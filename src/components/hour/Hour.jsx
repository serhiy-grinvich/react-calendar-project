import React, { useState, useEffect } from 'react';
import Event from '../event/Event';
import RedLine from '../red-line/RedLine';
import {
  formatTimeWithZero,
  isCurrentDate,
} from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dataDay, dataHour, hourEvents, onDelete }) => {
  const isToday = isCurrentDate(dataDay);
  const isCurrentHour = new Date().getHours() === dataHour;
  const [hour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentHour = new Date().getHours();
      if (hour !== currentHour) {
        setCurrentHour(currentHour);
      }
    }, 1000 * 60);
    return () => {
      clearInterval(intervalId);
    };
  }, [hour]);

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
      {isToday && isCurrentHour && <RedLine />}
    </div>
  );
};

export default Hour;
