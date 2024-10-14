const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return { tickets: [], users: [] };
  }
};

export const fetchTickets = async () => {
  const data = await fetchData();
  return data.tickets || [];
};

export const fetchUsers = async () => {
  const data = await fetchData();
  return data.users || [];
};