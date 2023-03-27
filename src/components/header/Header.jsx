import React from 'react';
import PropTypes from 'prop-types';

import { isLastWeekInMonth } from '../../utils/dateUtils';
import './header.scss';

const Header = ({
  setPrevWeek,
  setNextWeek,
  setCurrentWeek,
  weekDates,
  onOpenModal,
}) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>
        Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={setCurrentWeek}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={setPrevWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={setNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {isLastWeekInMonth(weekDates)}
        </span>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  setPrevWeek: PropTypes.func.isRequired,
  setNextWeek: PropTypes.func.isRequired,
  setCurrentWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
