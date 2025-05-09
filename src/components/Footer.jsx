import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div className="font-semibold tracking-wider">© {new Date().getFullYear()} SweatCrew</div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="#" className="hover:underline transition duration-150">
            Manage Cookies
          </Link>
          <Link to="#" className="hover:underline transition duration-150">
            Terms of Use
          </Link>
          <Link to="#" className="hover:underline transition duration-150">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
