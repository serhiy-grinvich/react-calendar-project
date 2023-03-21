import React from 'react';
import { formatTimeWithZero } from '../../utils/dateUtils';

import './sidebar.scss';

const Sidebar = (props) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div className="time-slot" key={hour}>
          <span className="time-slot__time">
            {`${formatTimeWithZero(hour)}:00`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

// add key to list elem in render
