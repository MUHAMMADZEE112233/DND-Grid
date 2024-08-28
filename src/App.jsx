import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GridLayout from './components/GridLayout';
import GanttChart from './components/GanttChart';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <div className="button-container">
            <Link to="/">
              <button className="nav-button">Grid Layout</button>
            </Link>
            <Link to="/dashboard">
              <button className="nav-button">Dashboard</button>
            </Link>
            <Link to="/gantt-chart">
              <button className="nav-button">Gantt Chart</button>
            </Link>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<GridLayout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gantt-chart" element={<GanttChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
