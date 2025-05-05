// src/pages/Login.jsx
import React, { useRef, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo2.png'

export default function Login() {
  const emailRef = useRef()
  const pwRef = useRef()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, pwRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header (full-width) */}
      <nav className="w-full bg-white shadow-sm">
        <div className="flex items-center px-8 py-4">
        <span className="text-2xl font-bold tracking-widest">SweatCrew</span>
        </div>
       </nav>

      {/* Main (relative!) */}
      <div className="flex-grow flex items-center justify-center px-4 relative">
        {/* Badge */}
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-0 rounded-full shadow-md">
            <img
              src={logo}
              alt="SweatCrew Logo"
              className="h-50 w-50 rounded-full"
            />
          </div>
        </div>

        {/* Card (pushed down) */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mt-12">
          <h2 className="text-center text-2xl font-semibold mb-6">LOG IN</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                required
                className="w-full bg-gray-100 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                ref={pwRef}
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                required
                className="w-full bg-gray-100 placeholder-gray-400 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
            >
              {loading ? 'Logging In…' : 'LOG IN'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              FORGOT PASSWORD?
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            DON’T HAVE AN ACCOUNT?{' '}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              SIGN UP
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-bold tracking-widest">SweatCrew</span>
          </div>
          <div className="space-x-6">
            <a href="#" className="hover:underline">
              Manage cookies
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
