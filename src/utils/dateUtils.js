import moment from 'moment';

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const weekDates = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    weekDates.push(new Date(base.setDate(base.getDate() + i)));
  }
  return weekDates;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatTimeWithZero = (timeUnit) => {
  return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
};

export const isLastWeekInMonth = (weekDates) => {
  const firstDay = weekDates[0].getMonth();
  const lastDay = weekDates[weekDates.length - 1].getMonth();
  return firstDay === lastDay
    ? months[firstDay]
    : `${months[firstDay]} - ${months[lastDay]}`;
};

export const setDefaultEventTime = (eventStartDate, eventStartTime) => {
  const defaultDate = {};
  defaultDate.eventDate = eventStartDate
    ? eventStartDate
    : moment().format('YYYY-MM-DD');
  defaultDate.timeFrom = eventStartTime
    ? `${formatTimeWithZero(eventStartTime - 1)}:00`
    : moment().format('HH:mm');
  defaultDate.timeTo = eventStartTime
    ? `${formatTimeWithZero(eventStartTime)}:00`
    : moment().add(1, 'hours').format('HH:mm');

  return defaultDate;
};

export const isCurrentDate = (date) =>
  moment().format('MMM Do YY') === moment(date).format('MMM Do YY');
