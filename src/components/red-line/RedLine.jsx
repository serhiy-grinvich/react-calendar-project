import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './redLine.scss';

const RedLine = ({ onUpdateHour }) => {
  const [redLinePosition, setRedLinePosition] = useState(
    new Date().getMinutes()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedLinePosition(new Date().getMinutes());
      onUpdateHour();
    }, 1000 * 60);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="red-line" style={{ marginTop: redLinePosition }}>
      <div className="red-line__circle"></div>
      <div className="red-line__line"></div>
    </div>
  );
};

export default RedLine;

RedLine.propTypes = {
  onUpdateHour: PropTypes.func.isRequired,
};
