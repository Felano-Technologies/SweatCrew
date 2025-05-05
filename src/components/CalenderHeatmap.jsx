// src/components/CalendarHeatmap.jsx
import React from 'react'
import ReactCalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { format, subDays } from 'date-fns'

export default function CalendarHeatmap({ workouts }) {
  // build a map of dates to counts
  const endDate = new Date()
  const startDate = subDays(endDate, 365)
  const values = workouts.map(w => ({
    date: w.date,      // yyyy-MM-dd strings
    count: w.duration, // or w.count if you aggregate per day
  }))

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={value => {
          if (!value) return 'color-empty'
          if (value.count < 30) return 'color-low'
          if (value.count < 60) return 'color-medium'
          return 'color-high'
        }}
        showWeekdayLabels
        tooltipDataAttrs={value => ({
          'data-tip': value.date
            ? `${value.date}: ${value.count} min`
            : 'No data',
        })}
      />
    </div>
  )
}
