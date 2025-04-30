import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { parseISO, format, startOfWeek, addDays } from 'date-fns'

export default function WeeklyChart({ workouts, className }) {
  const today = new Date()
  const weekStart = startOfWeek(today)
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i)
    const key = format(date, 'yyyy-MM-dd')
    const minutes = workouts.filter(w => w.date === key).reduce((sum, w) => sum + (w.duration || 0), 0)
    return { day: format(date, 'EEE'), minutes }
  })

  return (
    <div className={`${className} bg-white rounded-2xl shadow p-6`}>\
n      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Minutes</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: '#666' }} />
          <YAxis tick={{ fill: '#666' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
          />
          <Bar dataKey="minutes" fill="#34A853" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}