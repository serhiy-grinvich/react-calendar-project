import React, { Component } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import events from '../../gateway/events';

import './calendar.scss';

class Calendar extends Component {
  state = {
    events,
  };
  onDeleteEvent = () => {
    this.setState({ events });
  };
  render() {
    const { weekDates, onCreate } = this.props;
    const currentDate = new Date();
    console.log(this.state);

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} currentDate={currentDate} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={events}
              onCreate={onCreate}
              onDelete={this.onDeleteEvent}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
