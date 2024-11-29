import React from "react";
import Dropdown from "./Dropdown";
import "../styles/Header.css";

const Header = ({ grouping, setGrouping, sortBy, setSortBy }) => {
  const groupOptions = [
    { label: "Group by Status", value: "status" },
    { label: "Group by User", value: "user" },
    { label: "Group by Priority", value: "priority" },
  ];

  const sortOptions = [
    { label: "Sort by Priority", value: "priority" },
    { label: "Sort by Title", value: "title" },
  ];

  return (
    <div className="header">
      <h1>Kanban Board</h1>
      <div className="controls">
        <Dropdown label="Grouping:" value={grouping} options={groupOptions} onChange={setGrouping} />
        <Dropdown label="Sorting:" value={sortBy} options={sortOptions} onChange={setSortBy} />
      </div>
    </div>
  );
};

export default Header;
