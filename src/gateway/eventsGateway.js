const baseUrl =
  'https://639db0201ec9c6657baffddd.mockapi.io/api/v1/calendar-tasks';

export const fetchEvents = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      alert('Failed to fetch data');
      return;
    }
    return response.json();
  });
};

export const createNewEvent = (eventObj) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventObj),
  }).then((response) => {
    if (!response.ok) {
      alert('Failed to create event');
      return;
    }
  });
};

export const deleteEvent = (id) => {
  return fetch(`${baseUrl}/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) {
      alert('Failed to delete event');
      return;
    }
  });
};
