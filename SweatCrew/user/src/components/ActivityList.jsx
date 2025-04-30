import React from 'react'

export default function ActivityList({ workouts }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No activities logged yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Duration</th>
                <th className="pb-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {workouts.slice(0, 10).map(w => (
                <tr
                  key={w.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 text-gray-800">{w.date}</td>
                  <td className="text-gray-800">{w.type}</td>
                  <td className="text-gray-800">{w.duration} m</td>
                  <td className="text-gray-800">{w.notes?.slice(0, 20) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
