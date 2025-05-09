import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { Dumbbell, Clock, Calendar, StickyNote } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TrackProgress() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    type: "",
    duration: "",
    date: "",
    notes: "",
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(
          collection(db, "users", currentUser.uid, "workouts")
        );
        onSnapshot(q, (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLogs(items.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || !form.duration || !form.date) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "users", user.uid, "workouts"), {
        ...form,
        duration: parseInt(form.duration),
        timestamp: Timestamp.now(),
      });
      setSuccessMessage("Workout logged successfully!");
      setForm({ type: "", duration: "", date: "", notes: "" });
    } catch (error) {
      setError("Failed to log workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalDuration = logs.reduce((sum, log) => sum + log.duration, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-3xl font-bold text-[#087E8B] mb-8">
          Track Your Progress
        </h2>

        {/* Log Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md mb-12"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workout Type</label>
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="e.g. Cardio, Strength"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 45"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <input
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Felt great!"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#087E8B] text-white py-2 rounded-md font-medium transition hover:bg-[#066f7c] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging..." : "Log Activity"}
            </button>
          </div>
        </form>

        {/* Feedback */}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
          <p className="text-sm text-gray-600">Total Sessions: {logs.length}</p>
          <p className="text-sm text-gray-600">Total Duration: {totalDuration} minutes</p>
        </div>

        {/* Logs List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Logs</h3>
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500">No logs yet. Start tracking!</p>
          ) : (
            <ul className="space-y-4">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[#087E8B] mb-1 font-medium">
                    <Dumbbell size={16} /> {log.type}
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Clock size={14} /> {log.duration} min
                    <Calendar size={14} /> {log.date}
                  </div>
                  {log.notes && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <StickyNote size={14} /> {log.notes}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
