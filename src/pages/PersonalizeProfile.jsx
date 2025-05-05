import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function PersonalizeProfile() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState(null)
  const [weight, setWeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [city, setCity] = useState('')
  const [location, setLocation] = useState('Ghana')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    let profileUrl = ''
    if (profileImage) {
      const storage = getStorage()
      const imgRef = storageRef(storage, `profileImages/${currentUser.uid}`)
      await uploadBytes(imgRef, profileImage)
      profileUrl = await getDownloadURL(imgRef)
    }

    const profileData = {
      profileUrl,
      weight,
      heightFt,
      heightIn,
      city,
      location
    }

    await setDoc(doc(db, 'users', currentUser.uid), profileData, { merge: true })
    navigate('/dashboard')  
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#087E8B]">Personalize Profile</h1>

        {/* Avatar uploader */}
        <div className="flex flex-col items-center">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
              {profileImage
                ? <img src={URL.createObjectURL(profileImage)} className="w-32 h-32 rounded-full object-cover" />
                : <span className="text-2xl text-gray-500">📷</span>}
            </div>
            <p className="mt-2 text-gray-600 text-sm">Add your profile image</p>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => setProfileImage(e.target.files[0])}
          />
        </div>

        {/* ... (weight, height, city/state, location fields) ... */}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 border-2 border-[#087E8B] text-[#087E8B] rounded-lg font-semibold"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#087E8B] text-white rounded-lg font-semibold"
          >
            {loading ? 'Saving…' : 'Done'}
          </button>
        </div>
      </form>
    </div>
  )
}
