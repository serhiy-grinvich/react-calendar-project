import React, { Component } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

class App extends Component {
  state = {
    weekStartDate: new Date(),
    isModalActive: false,
  };

  setPreviousWeek = () => {
    const { weekStartDate } = this.state;
    const oneWeekAgo = new Date(
      weekStartDate.setDate(weekStartDate.getDate() - 7)
    );
    this.setState({ weekStartDate: oneWeekAgo });
  };

  setNextWeek = () => {
    const { weekStartDate } = this.state;
    const oneWeekNext = new Date(
      weekStartDate.setDate(weekStartDate.getDate() + 7)
    );
    this.setState({ weekStartDate: oneWeekNext });
  };

  setCurrentWeek = () => {
    this.setState({ weekStartDate: new Date() });
  };

  onCloseModalHandler = () => {
    this.setState({
      isModalActive: false,
    });
  };

  onOpenModalHandler = (e) => {
    this.setState({
      isModalActive: true,
    });
  };

  render() {
    const { weekStartDate, isModalActive } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          setPrevWeek={this.setPreviousWeek}
          setNextWeek={this.setNextWeek}
          setCurrentWeek={this.setCurrentWeek}
          weekDates={weekDates}
          onOpenModal={this.onOpenModalHandler}
        />
        <Calendar
          weekDates={weekDates}
          onOpenModal={this.onOpenModalHandler}
          onCloseModal={this.onCloseModalHandler}
          isModalActive={isModalActive}
        />
      </>
    );
  }
}

export default App;

// realize setPrevWeek & setNextWeek callback
