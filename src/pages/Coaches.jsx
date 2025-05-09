import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [newCoach, setNewCoach] = useState({
    name: "",
    specialty: "",
    experience: "",
    bio: "",
    image: "",
    tags: [],
    rating: 0,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [bookCoach, setBookCoach] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultImage = "https://i.imgur.com/rs5KZyz.png";

  useEffect(() => {
    const q = query(collection(db, "coaches"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coachData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoaches(coachData);
    });

    return () => unsubscribe();
  }, []);

  const handleCoachRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coachRef = collection(db, "coaches");
      await addDoc(coachRef, {
        ...newCoach,
        image: newCoach.image || defaultImage,
      });
      toast.success("Coach registered!");
      setShowRegister(false);
      setNewCoach({
        name: "",
        specialty: "",
        experience: "",
        bio: "",
        image: "",
        tags: [],
        rating: 0,
      });
    } catch (error) {
      console.error("Error registering coach: ", error);
      toast.error("Error registering coach.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e, coachId) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      coachId,
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      date: e.target.date.value,
      notes: e.target.notes.value || "No additional notes",
    };

    try {
      await addDoc(collection(db, "bookings"), bookingData);
      toast.success("Session booked!");
      setBookCoach(null);
    } catch (error) {
      console.error("Error booking session: ", error);
      toast.error("Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-16 px-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Meet Our Coaches</h2>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="bg-[#087E8B] text-white px-4 py-2 rounded hover:bg-[#065d64] transition duration-300"
            >
              {showRegister ? "Cancel" : "Register as a Coach"}
            </button>
          </div>

          {showRegister && (
            <form
              onSubmit={handleCoachRegister}
              className="bg-white p-6 rounded-lg shadow-md mb-10"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#087E8B]">Coach Registration</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 p-2 border rounded"
                value={newCoach.name}
                onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Specialty (e.g., Cardio, Yoga)"
                className="w-full mb-4 p-2 border rounded"
                value={newCoach.specialty}
                onChange={(e) => setNewCoach({ ...newCoach, specialty: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Years of Experience"
                className="w-full mb-4 p-2 border rounded"
                value={newCoach.experience}
                onChange={(e) => setNewCoach({ ...newCoach, experience: e.target.value })}
                required
              />
              <textarea
                placeholder="Short Bio"
                className="w-full mb-4 p-2 border rounded"
                value={newCoach.bio}
                onChange={(e) => setNewCoach({ ...newCoach, bio: e.target.value })}
                required
              ></textarea>
              <input
                type="url"
                placeholder="Profile Image URL (optional)"
                className="w-full mb-4 p-2 border rounded"
                value={newCoach.image}
                onChange={(e) => setNewCoach({ ...newCoach, image: e.target.value })}
              />
              <button
                type="submit"
                className="bg-[#087E8B] text-white px-6 py-2 rounded hover:bg-[#065d64] transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register Coach"}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                <img
                  src={coach.image || defaultImage}
                  alt={coach.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-xl font-bold text-gray-800">{coach.name}</h4>
                <p className="text-gray-600">{coach.specialty}</p>
                <p className="text-gray-500 text-sm mb-2">{coach.experience} years experience</p>
                <p className="text-sm text-gray-700 italic mb-3">"{coach.bio}"</p>
                <button
                  onClick={() => setBookCoach(coach)}
                  className="w-full bg-[#087E8B] text-white py-2 rounded hover:bg-[#065d64] transition duration-300"
                >
                  Book a Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {bookCoach && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold text-center text-[#087E8B] mb-4">
              Book Session with {bookCoach.name}
            </h3>
            <form onSubmit={(e) => handleBooking(e, bookCoach.id)}>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <textarea
                name="notes"
                placeholder="Any notes or goals for the session (optional)"
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setBookCoach(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#087E8B] text-white px-4 py-2 rounded hover:bg-[#065d64] transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Coaches;
