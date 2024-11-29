import React from "react";
import "../styles/Card.css";

const Card = ({ ticket }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className="card">
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <span className={`priority-${ticket.priority}`}>
        {priorityLabels[ticket.priority]}
      </span>
    </div>
  );
};

export default Card;
