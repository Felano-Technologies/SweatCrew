import React from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UpcomingEvents({ events }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden"
    >
      <div className="flex items-center p-4 border-b">
        <CalendarDays className="w-6 h-6 text-green-500" />
        <h3 className="ml-2 text-lg font-semibold">Upcoming Events</h3>
      </div>
      <div className="p-6 space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500">Nothing on the calendar.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((e, idx) => (
              <li
                key={idx}
                className="group flex flex-col p-4 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold group-hover:text-gray-800">
                    {e.title}
                  </span>
                  <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="mt-1 text-sm text-gray-500">{e.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
)
}