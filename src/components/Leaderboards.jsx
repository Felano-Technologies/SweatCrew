import React from 'react'
import { motion } from 'framer-motion'
import { Award, Crown, Star } from 'lucide-react'

const ICONS = [Crown, Award, Star]

export default function Leaderboards({ topUsers }) {
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
                    <Icon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
                    <span className="font-semibold group-hover:text-gray-800">
                      {i + 1}. {user.username}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-600">
                    {user.workoutCount} workouts
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </motion.div>
)
}