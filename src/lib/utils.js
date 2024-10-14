export const groupTickets = (tickets, grouping, users) => {
  const initialGroups = {};

  if (grouping === 'status') {
    initialGroups['Backlog'] = [];
    initialGroups['In progress'] = [];
    initialGroups['Todo'] = [];
    initialGroups['Cancelled'] = [];
    initialGroups['Done'] = [];
  } else if (grouping === 'priority') {
    initialGroups['Urgent'] = [];
    initialGroups['High'] = [];
    initialGroups['Medium'] = [];
    initialGroups['Low'] = [];
    initialGroups['No priority'] = [];
  } else if (grouping === 'user') {
    users.forEach(user => {
      initialGroups[user.name] = [];
    });
  }

  return tickets.reduce((acc, ticket) => {
    let key;
    switch (grouping) {
      case 'priority':
        key = getPriorityLabel(ticket.priority);
        break;
      case 'user':
        key = getUserName(ticket.userId, users);
        break;
      default:
        key = ticket.status;
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, initialGroups);
};

export const sortTickets = (tickets, sorting) => {
  return tickets.sort((a, b) => {
    if (sorting === 'priority') {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
};

export const getPriorityLabel = (priority) => {
  switch (Number(priority)) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'No priority';
  }
};

export const getUserName = (userId, users) => {
  if (!users) return 'Unknown User';
  const user = users.find(user => user.id === userId);
  return user ? user.name : 'Unknown User';
};