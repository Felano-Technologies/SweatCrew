// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Signup               from './pages/Signup'
import Login                from './pages/Login'
import Dashboard            from './pages/Dashboard'
import LogWorkout           from './pages/LogWorkout'
import PersonalizeProfile   from './pages/PersonalizeProfile'  // fixed path

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login"  element={<Login />} />

          <Route
            path="/log-workout"
            element={
              <ProtectedRoute>
                <LogWorkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/personalize-profile"
            element={
              <ProtectedRoute>
                <PersonalizeProfile />
              </ProtectedRoute>
            }
          />  {/* ← properly closed */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
