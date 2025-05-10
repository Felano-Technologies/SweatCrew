import React, { useMemo } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Streaks({ workouts }) {
  const { currentStreak, longestStreak } = useMemo(() => {
    const dates = Array.from(
      new Set(
        workouts.map(w =>
          w.createdAt instanceof Date ? w.createdAt : new Date(w.createdAt)
        )
      )
    ).sort((a, b) => a - b) // Sort oldest to newest
  
    if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 }
  
    let longest = 1
    let current = 1
    let tempStreak = 1
  
    for (let i = 1; i < dates.length; i++) {
      const diff = differenceInCalendarDays(dates[i], dates[i - 1])
      if (diff === 1) {
        tempStreak++
      } else if (diff > 1) {
        longest = Math.max(longest, tempStreak)
        tempStreak = 1
      }
    }
  
    longest = Math.max(longest, tempStreak)
  
    const daysSinceLast = differenceInCalendarDays(new Date(), dates[dates.length - 1])
    const isToday = daysSinceLast === 0
    const isYesterday = daysSinceLast === 1
  
    if (isToday || isYesterday) {
      current = 1
      for (let i = dates.length - 1; i > 0; i--) {
        const diff = differenceInCalendarDays(dates[i], dates[i - 1])
        if (diff === 1) {
          current++
        } else {
          break
        }
      }
    } else {
      current = 0
    }
  
    return { currentStreak: current, longestStreak: longest }
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