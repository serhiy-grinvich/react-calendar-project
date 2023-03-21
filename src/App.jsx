import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

class App extends Component {
  state = {
    weekStartDate: new Date(),
    isModalActive: false,
    eventDate: '',
    eventStartTime: '',
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
      eventStartTime: '',
      eventDate: '',
    });
  };

  onOpenModalHandler = (e) => {
    this.setState({
      isModalActive: true,
      eventStartTime: e.target.dataset.time,
      eventDate: e.target.parentNode.dataset.day,
    });
  };

  render() {
    const { weekStartDate, isModalActive, eventDate, eventStartTime } =
      this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    // console.log(this.state);
    return (
      <>
        <Header
          setPrevWeek={this.setPreviousWeek}
          setNextWeek={this.setNextWeek}
          setCurrentWeek={this.setCurrentWeek}
          weekDates={weekDates}
          onCreate={this.onOpenModalHandler}
        />
        <Calendar weekDates={weekDates} onCreate={this.onOpenModalHandler} />

        {isModalActive ? (
          <Modal
            onClose={this.onCloseModalHandler}
            eventDate={eventDate}
            eventStartTime={eventStartTime}
          />
        ) : null}
      </>
    );
  }
}

export default App;

// realize setPrevWeek & setNextWeek callback
