import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import { 
  threeDotMenu, 
  add, 
  backlog, 
  cancelled, 
  done, 
  inProgress, 
  todo, 
  highPriority, 
  lowPriority, 
  mediumPriority, 
  noPriority, 
  urgentPriorityColour 
} from '../../Assets';

function Column({ title, tickets, users, grouping }) {
  const getColumnIcon = () => {
    if (grouping === 'status') {
      switch (title.toLowerCase()) {
        case 'backlog': return backlog;
        case 'cancelled': return cancelled;
        case 'done': return done;
        case 'in progress': return inProgress;
        case 'todo': return todo;
        default: return null;
      }
    } else if (grouping === 'priority') {
      switch (title) {
        case 'Urgent': return urgentPriorityColour;
        case 'High': return highPriority;
        case 'Medium': return mediumPriority;
        case 'Low': return lowPriority;
        case 'No priority': return noPriority;
        default: return null;
      }
    } else if (grouping === 'user') {
      const user = users.find(u => u.name === title);
      if (user) {
        //  return user.avatar; with its availability 
        return {
          available: user.available,
          avatar: 'https://ui-avatars.com/api/?name=' + user.name + '&background=random'
        }
      }
    }
    return null;
  };

  const columnIcon = getColumnIcon();

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {columnIcon && (
            grouping === 'user' ? (
              <div className='user-avatar-container'>
              <img src={columnIcon.avatar} alt={title} className="user-avatar" />
            <span className={`availability-indicator ${columnIcon.available ? 'available' : 'unavailable'}`}></span>
            </div>
            ) : (
              <img src={columnIcon} alt={title} className="column-icon" />
            )
          )}
          <h2>{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <img src={add} alt="Add item" className="action-icon" />
          <img src={threeDotMenu} alt="More options" className="action-icon" />
        </div>
      </div>
      <div className="column-content">
        {tickets.map((ticket) => (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            user={users ? users.find(u => u.id === ticket.userId) : null} 
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;