import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-200 transition">
          User Management
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="/users" className="text-white font-medium hover:text-gray-200 transition">
            Users
          </Link>
          <Link
            href="/users/create"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            + Create User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
