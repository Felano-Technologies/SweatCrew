import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Signup               from './pages/Signup'
import Login                from './pages/Login'
import Dashboard            from './pages/Dashboard'
import PersonalizeProfile   from './pages/PersonalizeProfile'
import Profile   from './pages/Profile'
import LandingPage         from './pages/LandingPage'
import Coaches              from './pages/Coaches'
import Challenges              from './pages/Challenges'
import TrackProgress              from './pages/TrackProgress'
import Community              from './pages/Community'
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login"  element={<Login />} />


          <Route
            path="/personalize-profile"
            element={
              <ProtectedRoute>
                <PersonalizeProfile />
              </ProtectedRoute>
            }
          />  
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
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

          <Route
            path="/coaches"
            element={
              <ProtectedRoute>
                <Coaches />
              </ProtectedRoute>
            }
          />

          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />

          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <TrackProgress />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}
