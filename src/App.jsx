import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Signup               from './pages/Signup'
import Login                from './pages/Login'
import Dashboard            from './pages/Dashboard'
import LogWorkout           from './pages/LogWorkout'
import PersonalizeProfile   from './pages/PersonalizeProfile'
import LandingPage         from './pages/LandingPage'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          />  

          <Route
            path="/dashboard"
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
