import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Crown, Star, User } from 'lucide-react'
import { collection, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

const ICONS = [Crown, Award, Star]

export default function Leaderboards() {
  const { currentUser, profile } = useAuth()
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    if (!currentUser) return

    const workoutsRef = collection(db, 'users', currentUser.uid, 'workouts')
    onSnapshot(workoutsRef, snapshot => {
      const workouts = snapshot.docs.map(doc => doc.data())
      const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0)

      const realUser = {
        id: currentUser.uid,
        username: profile?.displayName || 'You',
        workoutCount: workouts.length,
        totalMinutes,
      }

      const firstNames = ['Kwaku', 'John', 'Obaa', 'Stanley', 'Felix', 'Elijah', 'Paa Kwesi', 'James', 'Isabella', 'Bevelyn']
      const lastNames = ['Anokye', 'Frimpong', 'Broni', 'Kpakpo', 'Adu', 'Ohene', 'Asante', 'Boafo', 'Nkrumah', 'Asamoah']
      
      const getRandomName = () => {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)]
        const last = lastNames[Math.floor(Math.random() * lastNames.length)]
        return `${first} ${last}`
      }
      
      const dummyUsers = Array.from({ length: 4 }).map((_, i) => ({
        id: `dummy-${i}`,
        username: getRandomName(),
        workoutCount: Math.floor(Math.random() * 30) + 5,
        totalMinutes: Math.floor(Math.random() * 300) + 100,
      }))
      
      const combined = [...dummyUsers, realUser]
        .sort((a, b) => b.totalMinutes - a.totalMinutes)
        .slice(0, 5)

      setTopUsers(combined)
    })
  }, [currentUser, profile])

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden"
    >
      <div className="flex items-center p-4 border-b">
        <Award className="w-6 h-6 text-yellow-500" />
        <h3 className="ml-2 text-lg font-semibold">Leaderboards</h3>
      </div>
      <div className="p-6">
        {topUsers.length === 0 ? (
          <p className="text-gray-500">No one’s topped the board yet.</p>
        ) : (
          <ul className="space-y-4">
            {topUsers.map((user, i) => {
              const Icon = ICONS[i] || Star
              return (
                <li
                  key={user.id}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    <span className="font-semibold group-hover:text-gray-800">
                      {i + 1}. {user.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-yellow-500 group-hover:text-yellow-600" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-600">
                      {user.totalMinutes} mins
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </motion.div>
  )
}
