import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { User, Camera, MessageCircle, Plus } from "lucide-react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JoinACrew = () => {
  const [user, setUser] = useState(null);
  const [crews, setCrews] = useState([]);
  const [newPost, setNewPost] = useState({ content: "", crew: "", imageUrl: "" });
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [newCrewName, setNewCrewName] = useState(""); // New crew name for creating a crew

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetching crews from Firestore
    const q = query(collection(db, "crews"));
    onSnapshot(q, (snapshot) => {
      setCrews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    if (user) {
      // Fetching posts based on selected crew
      const q = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [user]);

  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.content.trim() === "" || newPost.crew === "") return;

    try {
      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        content: newPost.content,
        crew: newPost.crew,
        imageUrl: newPost.imageUrl,
        timestamp: Timestamp.now(),
      });
      setNewPost({ content: "", crew: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        userId: user.uid,
        content: newComment,
        timestamp: Timestamp.now(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleCrewJoin = async (crewId) => {
    try {
      // Add user to the crew (update the user's data to include the crewId)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        crew: crewId,
      });
    } catch (error) {
      console.error("Error joining crew: ", error);
    }
  };

  const handleCrewCreate = async () => {
    if (newCrewName.trim() === "") return;

    try {
      // Create a new crew in Firestore
      const crewRef = await addDoc(collection(db, "crews"), {
        name: newCrewName,
        members: [user.uid], // Add the creator as the first member
        createdAt: Timestamp.now(),
      });

      // Also add this crew to the user's data
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        crew: crewRef.id, // Associate the user with the newly created crew
      });

      setNewCrewName(""); // Reset the crew name field
    } catch (error) {
      console.error("Error creating crew: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 pt-24">
        <h2 className="text-2xl font-bold text-[#087E8B] mb-6">Join a Crew</h2>

        {/* Crew Management Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Create or Join a Crew</h3>
          
          {/* Create Crew */}
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={newCrewName}
              onChange={(e) => setNewCrewName(e.target.value)}
              placeholder="Enter crew name"
              className="w-full border rounded p-2"
            />
            <button
              onClick={handleCrewCreate}
              className="bg-[#087E8B] text-white py-2 px-4 rounded hover:bg-[#066f7c]"
            >
              Create Crew <Plus size={16} />
            </button>
          </div>

          {/* Join Crew */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Available Crews</h4>
            {crews.map((crew) => (
              <div key={crew.id} className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
                <p>{crew.name}</p>
                <button
                  onClick={() => handleCrewJoin(crew.id)}
                  className="bg-[#087E8B] text-white py-1 px-4 rounded hover:bg-[#066f7c]"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Form */}
        {user && (
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">Create a Post</h3>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Select Crew</label>
                <select
                  name="crew"
                  value={newPost.crew}
                  onChange={handlePostChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Crew</option>
                  {crews.map((crew) => (
                    <option key={crew.id} value={crew.id}>
                      {crew.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">What's on your mind?</label>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handlePostChange}
                  placeholder="Share something with your crew..."
                  className="w-full border rounded p-2"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Image URL (Optional)</label>
                <input
                  name="imageUrl"
                  value={newPost.imageUrl}
                  onChange={handlePostChange}
                  placeholder="Image URL"
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#087E8B] text-white py-2 rounded hover:bg-[#066f7c]"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts Feed */}
        <div>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow mb-8 cursor-pointer"
              onClick={() => setSelectedPost(post.id)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <User size={40} className="text-[#087E8B]" />
                <div>
                  <h4 className="text-lg font-semibold">{post.userId}</h4>
                  <p className="text-gray-500">{post.timestamp.toDate().toLocaleString()}</p>
                </div>
              </div>
              <p className="text-lg mb-4">{post.content}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full h-64 object-cover rounded-xl" />}
              <div className="flex items-center mt-4 text-[#087E8B]">
                <MessageCircle size={20} /> <span className="ml-2">Comments</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comments on Post */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-md relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              <div>
                <form
                  onSubmit={(e) => handleCommentSubmit(e, selectedPost)}
                  className="flex space-x-4 mb-4"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="w-full border rounded p-2"
                  />
                  <button type="submit" className="bg-[#087E8B] text-white p-2 rounded">
                    Comment
                  </button>
                </form>

                {/* Fetch Comments for this post */}
                <div>
                  {selectedPost && (
                    <div>
                      {selectedPost.comments?.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-4 mb-4">
                          <User size={40} />
                          <div>
                            <p className="font-semibold">{comment.userId}</p>
                            <p>{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JoinACrew;
