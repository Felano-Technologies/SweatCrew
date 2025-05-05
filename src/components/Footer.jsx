import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white py-4 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
        <div className="font-bold tracking-widest">SweatCrew</div>
        <div className="flex flex-wrap gap-4">
          <Link to="#" className="hover:underline">
            Manage Cookies
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Use
          </Link>
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
