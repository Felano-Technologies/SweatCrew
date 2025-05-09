import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ClockIcon,
  FireIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"; // Heroicons Outline

const challenges = [
  {
    title: "7-Day Abs Challenge",
    description: "Sculpt your core with a daily 15-minute ab workout for 7 days.",
    duration: "7 Days",
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/800x400?abs,workout",
  },
  {
    title: "30-Day Full Body Burn",
    description: "A progressive challenge that hits every muscle group. No gym needed!",
    duration: "30 Days",
    difficulty: "Advanced",
    image: "https://source.unsplash.com/random/800x400?fitness,fullbody",
  },
  {
    title: "14-Day Fat Burner",
    description: "Torch calories daily with this high-intensity bodyweight routine.",
    duration: "14 Days",
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/800x400?hiit,cardio",
  },
  {
    title: "21-Day Beginner Bootcamp",
    description: "Start your fitness journey with easy, low-impact exercises.",
    duration: "21 Days",
    difficulty: "Beginner",
    image: "https://source.unsplash.com/random/800x400?beginner,fitness",
  },
];

export default function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const closeModal = () => setSelectedChallenge(null);

  return (
    <>
      <Navbar />

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔥 Fitness Challenges</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {challenges.map((challenge, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    {challenge.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FireIcon className="w-4 h-4 text-orange-500" />
                    {challenge.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className="inline-block bg-[#087E8B] text-white px-4 py-2 rounded hover:bg-[#065d64]"
                >
                  View Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <img
              src={selectedChallenge.image}
              alt={selectedChallenge.title}
              className="w-full h-52 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedChallenge.title}</h2>
            <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                {selectedChallenge.duration}
              </span>
              <span className="flex items-center gap-1">
                <FireIcon className="w-4 h-4 text-orange-500" />
                {selectedChallenge.difficulty}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}