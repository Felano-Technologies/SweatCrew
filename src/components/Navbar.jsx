import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust path

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-gray-900">
          SweatCrew
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLinks />
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center text-gray-700">
                <UserCircle size={24} className="mr-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-md">
          <div className="flex flex-col space-y-2">
            <NavLinks />
            {user ? (
              <>
                {/* <Link to="/profile" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
                  My Profile
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
    {user ? (
      <Link to="/dashboard" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
        Dashboard
      </Link>
    ) : null}

      <Link to="/coaches" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
        Get a Coach
      </Link>
      <Link to="/challenges" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
        Challenges
      </Link>
      <Link to="/track" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
        Track Progress
      </Link>
      <Link to="/community" className="text-gray-700 hover:text-[#087E8B] text-sm font-medium">
        Join a Crew
      </Link>
    </>
  );
}
