import React, { useState } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalActive, setModalVisibilityStatus] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const setPreviousWeek = () => {
    const oneWeekAgo = new Date(
      weekStartDate.setDate(weekStartDate.getDate() - 7)
    );
    setWeekStartDate(oneWeekAgo);
  };

  const setNextWeek = () => {
    const oneWeekNext = new Date(
      weekStartDate.setDate(weekStartDate.getDate() + 7)
    );
    setWeekStartDate(oneWeekNext);
  };

  const setCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const onCloseModalHandler = () => {
    setModalVisibilityStatus(false);
  };

  const onOpenModalHandler = () => {
    setModalVisibilityStatus(true);
  };

  return (
    <>
      <Header
        setPrevWeek={setPreviousWeek}
        setNextWeek={setNextWeek}
        setCurrentWeek={setCurrentWeek}
        weekDates={weekDates}
        onOpenModal={onOpenModalHandler}
      />
      <Calendar
        weekDates={weekDates}
        onOpenModal={onOpenModalHandler}
        onCloseModal={onCloseModalHandler}
        isModalActive={isModalActive}
      />
    </>
  );
};
export default App;
