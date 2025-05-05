// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import MetricsCards       from '../components/MetricsCards'
import WeeklyChart        from '../components/charts/WeeklyChart'
import CalendarHeatmap    from '../components/CalenderHeatmap'
import ActivityList       from '../components/ActivityList'
import Sidebar            from '../components/Sidebar'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth }        from '../contexts/AuthContext'
import { useNavigate }    from 'react-router-dom'
import { db }             from '../firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot as onCollectionSnapshot,
  doc,
  onSnapshot as onDocSnapshot
} from 'firebase/firestore'

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [workouts, setWorkouts]     = useState([])
  const [error, setError]           = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile]       = useState({})

  // Fetch workouts
  useEffect(() => {
    if (!currentUser) return
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onCollectionSnapshot(
      q,
      snapshot => {
        setWorkouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        setError('')
      },
      err => {
        console.error('❌ Error fetching workouts:', err)
        setError('Couldn’t load workouts. Check your Firestore rules.')
      }
    )
    return unsubscribe
  }, [currentUser])

  // Fetch profile (avatar URL)
  useEffect(() => {
    if (!currentUser) return
    const userDoc = doc(db, 'users', currentUser.uid)
    const unsubscribe = onDocSnapshot(userDoc, snap => {
      if (snap.exists()) setProfile(snap.data())
    })
    return unsubscribe
  }, [currentUser])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar drawer */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between p-6 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>

          <h1 className="text-2xl font-bold">Your Dashboard</h1>

          <div className="flex items-center space-x-4">
            {profile.profileUrl ? (
              <img
                src={profile.profileUrl}
                alt="Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </header>

        <main className="p-6 space-y-6 max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          {/* Metrics Summary Cards */}
          <MetricsCards workouts={workouts} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WeeklyChart workouts={workouts} className="lg:col-span-2" />
            <CalendarHeatmap workouts={workouts} />
          </div>

          {/* Recent Activity */}
          <ActivityList workouts={workouts} />
        </main>
      </div>
    </div>
  )
}
