import React from "react";
import Card from "./Card";
import "../styles/KanbanBoard.css";

const KanbanBoard = ({ tickets, users, grouping, sortBy }) => {
  // Ensure users and tickets are arrays
  const safeUsers = Array.isArray(users) ? users : [];
  const safeTickets = Array.isArray(tickets) ? tickets : [];

  // Map user IDs to user names
  const userMap = safeUsers.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  // Group tickets based on the selected grouping criterion
  const groupedTickets = safeTickets.reduce((acc, ticket) => {
    let key;
    if (grouping === "user") {
      key = userMap[ticket.userId] || "Unassigned"; // Use user name or fallback
    } else {
      key = ticket[grouping] || "Uncategorized";
    }

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sort tickets within each group
  Object.keys(groupedTickets).forEach((key) =>
    groupedTickets[key].sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    })
  );

  // Display loading or error states if needed
  if (!safeTickets.length) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="column">
          <h3>{group}</h3>
          {groupedTickets[group].map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
