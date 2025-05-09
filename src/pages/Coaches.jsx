import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  BriefcaseIcon,
  StarIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const dummyCoaches = [
  {
    name: "Aarav Mehta",
    specialty: "Fat Loss & HIIT",
    experience: "5 years",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    bio: "Certified fitness trainer helping clients burn fat and build endurance through fun, high-energy workouts.",
    tags: ["HIIT", "Cardio", "Fat Loss"],
    rating: 4.8,
  },
  {
    name: "Sneha Kapoor",
    specialty: "Strength & Mobility",
    experience: "3 years",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    bio: "Helping women become stronger, more flexible, and confident in their bodies through personalized routines.",
    tags: ["Strength", "Mobility", "Women Fitness"],
    rating: 4.6,
  },
];

export default function Coaches() {
  const [showRegister, setShowRegister] = useState(false);
  const [bookCoach, setBookCoach] = useState(null);

  return (
    <>
      <Navbar />

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meet Our Coaches</h1>
          <button
            onClick={() => setShowRegister(true)}
            className="bg-[#56666B] text-white px-4 py-2 rounded hover:bg-[#44555b] flex items-center gap-2"
          >
            <UserPlusIcon className="w-5 h-5" />
            Register as a Coach
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {dummyCoaches.map((coach, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-6 rounded-xl flex flex-col md:flex-row items-start gap-6"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">{coach.name}</h2>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="text-gray-500">{coach.specialty}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <BriefcaseIcon className="w-4 h-4" />
                  {coach.experience} Experience
                </p>
                <p className="text-sm mt-2 text-gray-700">{coach.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {coach.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  {coach.rating} / 5.0
                </p>
                <button
                  className="mt-4 bg-[#087E8B] text-white px-4 py-2 rounded hover:bg-[#065d64] flex items-center gap-2"
                  onClick={() => setBookCoach(coach)}
                >
                  <CalendarDaysIcon className="w-4 h-4" />
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Register Coach Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowRegister(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Register as a Coach</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Specialty" className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Experience (e.g. 3 years)" className="w-full border rounded px-3 py-2" />
              <textarea placeholder="Short Bio" className="w-full border rounded px-3 py-2" rows="3" />
              <button className="w-full bg-[#087E8B] text-white py-2 rounded hover:bg-[#065d64]">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Book Session Modal */}
      {bookCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setBookCoach(null)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Book Session with {bookCoach.name}</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Full Name" className="w-full border rounded px-3 py-2" />
              <input type="email" placeholder="Your Email" className="w-full border rounded px-3 py-2" />
              <input type="date" className="w-full border rounded px-3 py-2" />
              <textarea placeholder="Goals / Notes (optional)" className="w-full border rounded px-3 py-2" rows="3" />
              <button className="w-full bg-[#087E8B] text-white py-2 rounded hover:bg-[#065d64]">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}