import React, { useState } from 'react';
import { Activity, X } from 'lucide-react'; // Using a single icon for all workouts
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const workouts = [
  {
    id: 1,
    name: 'Push-Ups',
    icon: <Activity size={24} />,
    description: 'Upper body strength workout.',
    instructions: '3 sets of 15 reps. Keep your body straight and go low.',
  },
  {
    id: 2,
    name: 'Running',
    icon: <Activity size={24} />,
    description: 'Great for stamina.',
    instructions: 'Run for 30 mins. Keep steady pace and breathe properly.',
  },
  {
    id: 3,
    name: 'Cycling',
    icon: <Activity size={24} />,
    description: 'Good leg and cardio workout.',
    instructions: 'Ride 10km at steady pace. Use helmet!',
  },
  {
    id: 4,
    name: 'Jumping Jacks',
    icon: <Activity size={24} />,
    description: 'Full body warm-up.',
    instructions: 'Do 5 sets of 30 seconds each with 10s rest.',
  },
  {
    id: 5,
    name: 'Hydration Break',
    icon: <Activity size={24} />,
    description: 'Don’t forget to hydrate!',
    instructions: 'Drink at least 1 glass of water between sets.',
  },
  {
    id: 6,
    name: 'Hiking',
    icon: <Activity size={24} />,
    description: 'Improves endurance.',
    instructions: 'Hike for 1 hour on moderate terrain.',
  },
  {
    id: 7,
    name: 'Shadow Boxing',
    icon: <Activity size={24} />,
    description: 'Cardio + coordination.',
    instructions: 'Throw punches for 3 mins, rest 1 min. Repeat 5 times.',
  },
  {
    id: 8,
    name: 'High Knees',
    icon: <Activity size={24} />,
    description: 'Quick warm-up cardio.',
    instructions: 'Run in place lifting knees for 1 min.',
  },
  {
    id: 9,
    name: 'Side Stretches',
    icon: <Activity size={24} />,
    description: 'Loosen up the core.',
    instructions: 'Stretch left/right sides 3x30s.',
  },
  {
    id: 10,
    name: 'Toe Touches',
    icon: <Activity size={24} />,
    description: 'Improve hamstring flexibility.',
    instructions: 'Do 3 rounds of 10 reps each.',
  },
  {
    id: 11,
    name: 'Walking',
    icon: <Activity size={24} />,
    description: 'Light recovery exercise.',
    instructions: 'Walk 20 mins after intense session.',
  },
  {
    id: 12,
    name: 'Heart Rate Test',
    icon: <Activity size={24} />,
    description: 'Track your intensity.',
    instructions: 'Check pulse after each round.',
  },
  {
    id: 13,
    name: 'Healthy Eating',
    icon: <Activity size={24} />,
    description: 'Fuel your gains.',
    instructions: 'Eat balanced meal with protein after workout.',
  },
  {
    id: 14,
    name: 'Bodyweight Squats',
    icon: <Activity size={24} />,
    description: 'Lower body strength.',
    instructions: 'Do 4 sets of 20 squats with 30s rest.',
  },
  {
    id: 15,
    name: 'Cool Down Stretch',
    icon: <Activity size={24} />,
    description: 'Relax and recover.',
    instructions: 'Gentle stretch for 10 mins.',
  },
  {
    id: 16,
    name: 'Plank Hold',
    icon: <Activity size={24} />,
    description: 'Core strength workout.',
    instructions: 'Hold plank for 1 min x 3 rounds.',
  },
  {
    id: 17,
    name: 'Dance Cardio',
    icon: <Activity size={24} />,
    description: 'Fun cardio with music.',
    instructions: 'Dance to 3 upbeat songs (roughly 10 mins).',
  },
  {
    id: 18,
    name: 'Skating Practice',
    icon: <Activity size={24} />,
    description: 'Balance and leg strength.',
    instructions: 'Skate around for 30 mins safely.',
  },
  {
    id: 19,
    name: 'Burpees',
    icon: <Activity size={24} />,
    description: 'Intense full-body workout.',
    instructions: 'Do 10 reps x 3 sets with 1 min rest.',
  },
  {
    id: 20,
    name: 'Stretch + Meditate',
    icon: <Activity size={24} />,
    description: 'Cool down mind and body.',
    instructions: 'Stretch then meditate for 5-10 minutes.',
  },
];

const Challenges = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
    <Navbar />
    <div className="p-6 pt-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#087E8B]">Workout Challenges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workouts.map((w) => (
          <div
            key={w.id}
            onClick={() => setSelected(w)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="text-[#087E8B]">{w.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{w.name}</h2>
                <p className="text-gray-500 text-sm">{w.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-[#087E8B]">{selected.icon}</div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
            </div>
            <p className="text-gray-700">{selected.instructions}</p>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Challenges;
