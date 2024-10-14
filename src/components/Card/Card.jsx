import React from 'react';
import './Card.css';
import {
  urgentPriorityColour,
  highPriority,
  mediumPriority,
  lowPriority,
  noPriority
} from '../../Assets';

const priorityIcons = {
  4: urgentPriorityColour,
  3: highPriority,
  2: mediumPriority,
  1: lowPriority,
  0: noPriority
};

function Card({ ticket, user, grouping }) {
  const getPriorityIcon = () => {
    return grouping !== 'priority' ? priorityIcons[ticket.priority] : null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name} 
              className="user-avatar" 
            />
            <span className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}></span>
          </div>
        )}
      </div>
      <div className="card-title">
        {getPriorityIcon() && (
          <img src={getPriorityIcon()} alt="Priority" className="priority-icon" />
        )}
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-footer">
        <div className="tag">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="tag-label">
              <span className="tag-dot"></span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;