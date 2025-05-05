import React, { useEffect, useState } from 'react'
import MetricsCards from '../components/MetricsCards'
import WeeklyChart from '../components/charts/WeeklyChart'
import CalendarHeatmap from '../components/CalenderHeatmap'
import ActivityList from '../components/ActivityList'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Streaks from '../components/Streaks'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
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

  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [profile, setProfile] = useState({})

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
    <div className="min-h-screen flex flex-col">
      <Navbar profile={profile} onLogout={handleLogout} />

      <main className="flex-1 p-6 pt-30 space-y-6 max-w-7xl mx-auto w-full">
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
          {/* Optional: Add something else here later */}
        </div>

        {/* Recent Activity */}
        <ActivityList workouts={workouts} />

        {/* Streaks Placeholder */}
        <Streaks workouts={workouts} />

        {/* Heatmap */}
        <div>
          <h2 className="text-xl font-semibold text-[#087E8B] mb-4">Workout Heatmap</h2>
          <CalendarHeatmap workouts={workouts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
