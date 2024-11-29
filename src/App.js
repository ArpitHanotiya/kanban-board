import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage";
import "./styles/App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const [grouping, setGrouping] = useState(getFromLocalStorage("grouping", "status"));
  const [sortBy, setSortBy] = useState(getFromLocalStorage("sortBy", "priority"));

  useEffect(() => {
    saveToLocalStorage("grouping", grouping);
    saveToLocalStorage("sortBy", sortBy);
  }, [grouping, sortBy]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        console.log("Fetched Tickets:", data);
        setTickets(data.tickets);
        setUsers(data.users); // Store users as well
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };
    fetchTickets();
  }, []);
  
  

  return (
    <div className="app">
      <Header grouping={grouping} setGrouping={setGrouping} sortBy={sortBy} setSortBy={setSortBy} />
      <KanbanBoard tickets={tickets} grouping={grouping} sortBy={sortBy} />
    </div>
  );
};

export default App;
