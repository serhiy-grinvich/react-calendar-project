import React, { useState, useEffect } from 'react';

import './redLine.scss';

const RedLine = () => {
  const [redLinePosition, setRedLinePosition] = useState(
    new Date().getMinutes()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedLinePosition(new Date().getMinutes());
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
