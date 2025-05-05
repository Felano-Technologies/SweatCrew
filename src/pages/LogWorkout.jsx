// src/pages/LogWorkout.jsx
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function LogWorkout() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [type, setType]         = useState('Run')
  const [date, setDate]         = useState(new Date().toISOString().slice(0,10))
  const [duration, setDuration] = useState('')
  const [notes, setNotes]       = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await addDoc(collection(db, 'workouts'), {
        userId:    currentUser.uid,
        type,
        date,
        duration: Number(duration),
        notes,
        createdAt: serverTimestamp(),
      })

      console.log('✅ Workout logged successfully')  // debug
      setLoading(false)
      setSuccess('💪 Workout logged! Redirecting to dashboard…')

      // Redirect after 1 second
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      console.error('🔥 LogWorkout error:', err)
      setError('Failed to log workout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Log a Workout</h2>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {!success && (
          <>
            {loading && (
              <p className="text-gray-600">Logging workout…</p>
            )}

            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option>Run</option>
                <option>Strength</option>
                <option>Yoga</option>
                <option>Bike</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                required
                className="w-full p-2 border rounded"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {loading ? 'Logging…' : 'Log Workout'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}
