import React, { useEffect, useState } from 'react';
import Column from '../Column/Column';
import { groupTickets, sortTickets } from '../../lib/utils';
import './KanbanBoard.css';

function KanbanBoard({ tickets, users, grouping, sorting, setIsOpen }) {
  const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState({});

  useEffect(() => {
    const updateTickets = async () => {
      const sortedTickets = sortTickets([...tickets], sorting);
      const grouped = groupTickets(sortedTickets, grouping, users);
      setGroupedAndSortedTickets(grouped);
    };

    updateTickets();
  }, [tickets, users, grouping, sorting]);

  const handleBoardClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="kanban-board" onClick={handleBoardClick}>
      {Object.entries(groupedAndSortedTickets).map(([group, groupTickets]) => (
        <Column 
          key={group} 
          title={group} 
          tickets={groupTickets} 
          users={users} 
          grouping={grouping}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;