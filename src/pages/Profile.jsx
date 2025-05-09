import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) return

    // Fetching user profile data from Firestore (e.g., bio, workout count, total time)
    const userDocRef = doc(db, 'user_profiles', currentUser.uid)

    const fetchProfile = async () => {
      try {
        const docSnapshot = await getDoc(userDocRef)
        if (docSnapshot.exists()) {
          setProfile(docSnapshot.data())
        } else {
          setError('User profile not found')
        }
      } catch (err) {
        setError('Error fetching profile')
        console.error(err)
      }
    }

    fetchProfile()
  }, [currentUser])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {error && <p className="text-red-500">{error}</p>}
        
        {profile ? (
          <div className="bg-white shadow-xl rounded-lg p-6">
            <div className="flex items-center space-x-6">
              {/* User Avatar (placeholder) */}
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                {/* Replace with real avatar */}
                <span className="text-2xl text-white">{currentUser.displayName[0]}</span>
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{currentUser.displayName}</h1>
                <p className="text-gray-500 mt-2">{profile.bio || 'This user has no bio yet.'}</p>
              </div>
            </div>

            {/* Workout Stats */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Workout Statistics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-xl font-semibold">Workouts Completed</p>
                  <p className="text-3xl text-[#087E8B]">{profile.workoutCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-xl font-semibold">Total Time Spent</p>
                  <p className="text-3xl text-[#087E8B]">{profile.totalMinutes || 0} mins</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
