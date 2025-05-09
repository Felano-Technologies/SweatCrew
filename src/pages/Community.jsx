import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Plus } from "lucide-react";
import { useState } from "react";

const dummyCrews = [
  { id: 1, name: "Morning Joggers", description: "Daily 5am runs to kickstart your day." },
  { id: 2, name: "Home Workout Warriors", description: "No gym? No problem! Bodyweight and home workouts." },
  { id: 3, name: "Strength Squad", description: "Focused on lifting and strength building." },
];

export default function Community() {
  const [joinedCrews, setJoinedCrews] = useState([]);

  const handleJoin = (crewId) => {
    if (!joinedCrews.includes(crewId)) {
      setJoinedCrews([...joinedCrews, crewId]);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto mt-24 px-4">
        <h1 className="text-3xl font-bold text-[#087E8B] mb-6 flex items-center gap-2">
          <Users /> Join a Crew
        </h1>

        <p className="text-gray-600 mb-4">
          Find and join fitness groups that match your style. Stay motivated with community support!
        </p>

        <div className="grid gap-4">
          {dummyCrews.map((crew) => (
            <div
              key={crew.id}
              className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-[#087E8B]">{crew.name}</h2>
              <p className="text-sm text-gray-600">{crew.description}</p>
              <button
                onClick={() => handleJoin(crew.id)}
                disabled={joinedCrews.includes(crew.id)}
                className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition ${
                  joinedCrews.includes(crew.id)
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-[#087E8B] text-white hover:bg-[#066c75]"
                }`}
              >
                <Plus size={14} /> {joinedCrews.includes(crew.id) ? "Joined" : "Join Crew"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
