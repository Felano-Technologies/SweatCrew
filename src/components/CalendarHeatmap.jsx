// src/components/CalendarHeatmap.jsx
import React from 'react'
import ReactCalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { subDays } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CalendarHeatmap({ workouts }) {
  const endDate = new Date()
  const startDate = subDays(endDate, 365)
  const values = workouts.map(w => ({
    date: w.date,
    count: w.duration,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden"
    >
      <div className="flex items-center p-4 border-b">
        <CalendarIcon className="w-6 h-6 text-blue-600" />
        <h3 className="ml-2 text-lg font-semibold">Activity Heatmap</h3>
      </div>
      <div className="p-6">
        <ReactCalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={v => {
            if (!v) return 'color-empty'
            if (v.count < 30) return 'color-low'
            if (v.count < 60) return 'color-medium'
            return 'color-high'
          }}
          showWeekdayLabels
          tooltipDataAttrs={v => ({
            'data-tip': v.date
              ? `${v.date}: ${v.count} min`
              : 'No data',
          })}
          className="mx-auto"
        />
      </div>
    </motion.div>
)
}