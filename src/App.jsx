import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Header from "./components/Header/Header";
import { fetchTickets, fetchUsers } from "./lib/api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    const savedState = localStorage.getItem("kanbanViewState");
    return savedState ? JSON.parse(savedState).grouping : "status";
  });
  const [sorting, setSorting] = useState(() => {
    const savedState = localStorage.getItem("kanbanViewState");
    return savedState ? JSON.parse(savedState).sorting : "priority";
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const loadTickets = async () => {
      const ticketsData = await fetchTickets();
      setTickets(ticketsData);
    };

    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    loadTickets();
    loadUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "kanbanViewState",
      JSON.stringify({ grouping, sorting })
    );
  }, [grouping, sorting]);

  return (
    <div className="App">
      <Header
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default App;