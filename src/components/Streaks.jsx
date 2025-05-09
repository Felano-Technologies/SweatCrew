import React, { useMemo } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Streaks({ workouts }) {
  const { currentStreak, longestStreak } = useMemo(() => {
    const dates = Array.from(
      new Set(
        workouts.map(w =>
          w.createdAt instanceof Date
            ? w.createdAt
            : new Date(w.createdAt)
        )
      )
    ).sort((a, b) => b - a)
    let curr = 0, longest = 0, prev = null
    dates.forEach((date, i) => {
      if (i === 0) {
        curr = differenceInCalendarDays(new Date(), date) === 0 ? 1 : 0
        longest = 1
        prev = date
        return
      }
      const diff = differenceInCalendarDays(prev, date)
      if (diff === 1) curr++
      else return
      longest = Math.max(longest, i + 1)
      prev = date
    })
    return { currentStreak: curr, longestStreak: longest }
  }, [workouts])

  const pct = longestStreak ? (currentStreak / longestStreak) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 text-center overflow-hidden"
    >
      <div className="flex items-center justify-center p-4 border-b">
        <Flame className="w-6 h-6 text-red-500" />
        <h3 className="ml-2 text-lg font-semibold">Your Streaks</h3>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Current</p>
          <p className="text-2xl font-bold">{currentStreak}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Longest</p>
          <p className="text-2xl font-bold">{longestStreak}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </motion.div>
)
}