import React, { useState } from "react";
import { display, down } from "../../Assets";
import "./Header.css";

function Header({
  grouping,
  sorting,
  setGrouping,
  setSorting,
  isOpen,
  setIsOpen,
}) {
  return (
    <header className="app-header">
      <div className="display-dropdown">
        <button onClick={() => setIsOpen(!isOpen)} className="display-button">
          <img src={display} alt="Display" className="display-icon" />
          <span>Display</span>
          <img
            src={down}
            alt="Open menu"
            className={`down-icon ${isOpen ? "rotate" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
