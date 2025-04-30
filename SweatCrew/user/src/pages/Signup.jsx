// src/pages/Signup.jsx
import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [firstName, setFirst] = useState('')
  const [lastName, setLast]   = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPw]     = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [agree, setAgree]     = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate   = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!agree) {
      return setError('You must agree to the terms.')
    }
    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      // TODO: persist firstName, lastName if needed
      navigate('/personalize-profile')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-center text-2xl font-semibold mb-6">SIGN UP</h2>

        {/* Single “NEW USER” pill */}
        <div className="mb-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              type="button"
              className="w-full py-2 text-sm font-medium bg-blue-700 text-white"
            >
              NEW USER
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              value={firstName}
              onChange={e => setFirst(e.target.value)}
              placeholder="First name"
              required
              className="w-full bg-gray-50 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              value={lastName}
              onChange={e => setLast(e.target.value)}
              placeholder="Last name"
              required
              className="w-full bg-gray-50 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-gray-50 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPw(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-50 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2 top-1/2 transform -translate-y--1.5 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showPw ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              By creating this account, I agree to the{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>{' '}
              &{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
          >
            {loading ? 'Loading…' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          ALREADY A USER?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            LOG IN
          </Link>
        </p>
      </div>
    </div>
  )
}
