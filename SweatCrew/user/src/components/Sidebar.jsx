// src/components/Sidebar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ open, onClose }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform`}
    >
      <button
        onClick={onClose}
        className="p-4 text-gray-600 hover:text-gray-900"
      >
        ✕ Close
      </button>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/" onClick={onClose}>Dashboard</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/log-workout" onClick={onClose}>Log Workout</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/personalize-profile" onClick={onClose}>Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <a href="#" onClick={() => {
              onClose()
              // optionally call logout here if desired
            }}>Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
