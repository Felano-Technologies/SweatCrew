import React, { useEffect, useState } from 'react'
import MetricsCards from '../components/MetricsCards'
import WeeklyChart from '../components/charts/WeeklyChart'
import CalendarHeatmap from '../components/CalendarHeatmap'
import ActivityList from '../components/ActivityList'
import Streaks from '../components/Streaks'
import Leaderboards from '../components/Leaderboards'
import UpcomingEvents from '../components/UpcomingEvents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
  onSnapshot as onDocSnapshot,
  getDocs,
  onSnapshot
} from 'firebase/firestore'
import { Home } from 'lucide-react'

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [profile, setProfile] = useState({})
  const [topUsers, setTopUsers] = useState([])
  const [events] = useState([
    { title: 'Monthly Challenge Kickoff', date: 'May 10, 2025' },
    { title: 'Virtual Group Workout', date: 'May 12, 2025' },
  ])

  useEffect(() => {
    if (!currentUser) return;
  
    const workoutsRef = collection(db, 'users', currentUser.uid, 'workouts');
  
    const unsubscribe = onSnapshot(workoutsRef, (snapshot) => {
      setWorkouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  
    return () => unsubscribe();
  }, [currentUser]);
  

  useEffect(() => {
    if (!currentUser) return
    const userDoc = doc(db, 'users', currentUser.uid)
    return onDocSnapshot(userDoc, snap => {
      if (snap.exists()) setProfile(snap.data())
    })
  }, [currentUser])

  useEffect(() => {
    async function fetchTopUsers() {
      const snapshot = await getDocs(collection(db, 'users'))
      const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setTopUsers(
        users
          .filter(u => u.workoutCount)
          .sort((a, b) => b.workoutCount - a.workoutCount)
          .slice(0, 5)
      )
    }
    fetchTopUsers()
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10 pt-20">
        <h1 className="flex items-center text-3xl font-bold text-[#087E8B] space-x-2">
          <Home className="w-6 h-6" />
          <span>Welcome back, {profile.displayName || 'Friend'}!</span>
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error}
          </div>
        )}

        <MetricsCards workouts={workouts} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WeeklyChart workouts={workouts} className="lg:col-span-2" />
          <Streaks workouts={workouts} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Leaderboards topUsers={topUsers} />
          <UpcomingEvents events={events} />
        </div>

        <ActivityList workouts={workouts} />

        <div className="pt-10">
          <CalendarHeatmap workouts={workouts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}