import { NavLink } from "react-router-dom";
import React from "react";
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/data" className="sidebar-menu-item">
            <span className="sidebar-menu-label">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="sidebar-menu-item">
            <span className="sidebar-menu-label">User Rank</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="sidebar-menu-item">
            <span className="sidebar-menu-label">Map</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
