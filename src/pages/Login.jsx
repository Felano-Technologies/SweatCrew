import React, { useRef, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar' 

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
      navigate('/dashboard')
    } catch {
      setError('Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mt-12">
          {/* Logo inside the form */}
          <div className="flex justify-center mb-6">
            <img 
              src={logo} 
              alt="SweatCrew Logo" 
              className="h-32 w-32 object-contain" 
            />
          </div>
          
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
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
              className="w-full py-3 bg-[#087E8B] text-white font-semibold rounded-lg hover:bg-[#4a5c57] transition"
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

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
