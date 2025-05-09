// src/components/MetricsCards.jsx
import React from 'react'
import { ClockIcon, ChartBarIcon, ArrowUpIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

export default function MetricsCards({ workouts }) {
  // Calculate total sessions, total duration, unique active days, and average session
  const total = workouts.length
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0)
  const uniqueDays = new Set(workouts.map(w => w.date)).size
  const avgSession = total ? Math.round(totalDuration / total) : 0
  const workoutTypes = workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1
    return acc
  }, {})

  const metrics = [
    {
      title: 'Sessions',
      value: total,
      icon: ChartBarIcon,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Minutes',
      value: totalDuration,
      icon: ClockIcon,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Active Days',
      value: uniqueDays,
      icon: ArrowUpIcon,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Avg / Session',
      value: avgSession,
      icon: CheckBadgeIcon,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map(({ title, value, icon: Icon, iconBg, iconColor }) => (
        <div
          key={title}
          className="bg-white rounded-2xl shadow p-6 flex items-center space-x-4 transition transform hover:shadow-lg hover:scale-105"
        >
          <div className={`${iconBg} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800">{value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
