import React, { useMemo } from 'react'
import { differenceInCalendarDays, parseISO } from 'date-fns'

export default function Streaks({ workouts }) {
  const { currentStreak, longestStreak } = useMemo(() => {
    const workoutDates = Array.from(
      new Set(workouts.map(w => new Date(w.createdAt?.toDate?.() || w.createdAt)))
    )
      .sort((a, b) => b - a) // descending

    let currentStreak = 0
    let longestStreak = 0
    let prevDate = null

    for (let i = 0; i < workoutDates.length; i++) {
      const date = workoutDates[i]

      if (i === 0) {
        if (differenceInCalendarDays(new Date(), date) === 0) {
          currentStreak = 1
        }
        longestStreak = 1
        prevDate = date
        continue
      }

      const diff = differenceInCalendarDays(prevDate, date)
      if (diff === 1) {
        currentStreak++
      } else if (i === 1 && differenceInCalendarDays(new Date(), prevDate) === 0) {
        // still consider a current streak if today is part of it
      } else {
        break // current streak ends
      }

      longestStreak = Math.max(longestStreak, i + 1)
      prevDate = date
    }

    return { currentStreak, longestStreak }
  }, [workouts])

  return (
    <div className="bg-white shadow p-6 rounded-lg text-center">
      <h2 className="text-xl font-semibold text-[#087E8B] mb-4">🔥 Your Streaks</h2>
      <p className="text-lg text-gray-700">Current streak: <strong>{currentStreak} day{currentStreak !== 1 ? 's' : ''}</strong></p>
      <p className="text-lg text-gray-700">Longest streak: <strong>{longestStreak} day{longestStreak !== 1 ? 's' : ''}</strong></p>
    </div>
  )
}
