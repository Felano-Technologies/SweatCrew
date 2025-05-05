import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="SweatCrew" className="h-10 w-10 rounded-full mr-3" />
          <span className="text-2xl font-bold tracking-wide text-gray-800">SweatCrew</span>
        </div>
        <div className="flex space-x-6">
          {['/', '/workouts', '/calendar', '/analytics'].map((path, idx) => {
            const label = ['Dashboard', 'Workouts', 'Calendar', 'Analytics'][idx]
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-green-600 transition ${isActive ? 'font-semibold text-green-600' : ''}`
                }
              >
                {label}
              </NavLink>
            )
          })}
        </div>
        <div>
          <img
            src={logo}
            alt="User avatar"
            className="h-10 w-10 rounded-full ring-2 ring-green-500"
          />
        </div>
      </div>
    </nav>
  )
}