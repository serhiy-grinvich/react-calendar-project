export const eventValidation = (event, eventsList) => {
  let errorMessage = '';

  if (eventMaxDurationValidation(event)) {
    errorMessage += eventMaxDurationValidation(event);
  }

  if (isEventsCross(event, eventsList)) {
    errorMessage += isEventsCross(event, eventsList);
  }

  if (isEventReverse(event)) {
    errorMessage += isEventReverse(event);
  }

  if (errorMessage) {
    alert(errorMessage);
    return false;
  }
  return true;
};

const eventMaxDurationValidation = (event) => {
  const difference = new Date(event.dateTo) - new Date(event.dateFrom);
  if (difference > 1000 * 60 * 60 * 6) {
    return `\n * ERROR: Event shouldn't be longer than 6 hours.`;
  }
};

const isEventsCross = (event, eventsList) => {
  const eventStart = new Date(event.dateFrom);
  const eventEnd = new Date(event.dateTo);
  const isCrossing = eventsList.some(({ dateFrom, dateTo }) => {
    // debugger;
    return (
      (eventStart >= dateFrom && eventStart < dateTo) ||
      (dateFrom >= eventStart && dateFrom < eventEnd)
    );
  });
  console.log(isCrossing);
  if (isCrossing) {
    return `\n * ERROR: Events shouldn't be at the same time.`;
  }
};

const isEventReverse = (event) => {
  const difference = new Date(event.dateTo) - new Date(event.dateFrom);
  if (difference < 0) {
    return `\n * ERROR: Event should finish later then start.`;
  }
};
