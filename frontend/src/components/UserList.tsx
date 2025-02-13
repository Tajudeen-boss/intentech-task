import React from 'react';
import Link from 'next/link';

interface User {
  id: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  occupation: string;
  email: string;
  phoneNumber: string;
}

interface UserListProps {
  users: User[];
  onDeleteUser: (id: string) => void;
}

const UserList = ({ users, onDeleteUser }: UserListProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {users.map((user) => (
        <div key={user.id} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          {/* Profile Photo & Name */}
          <div className="flex items-center space-x-4">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 object-cover rounded-full shadow-md"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 text-lg">
                No Image
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 italic">{user.occupation || "Occupation not available"}</p>
            </div>
          </div>

          {/* User Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold text-black">📧 Email:</p>
              <p className="text-gray-700">{user.email || "Not provided"}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold text-black">📞 Phone:</p>
              <p className="text-gray-700">{user.phoneNumber || "Not provided"}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-4">
            <Link href={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              View Details
            </Link>
            <button
              onClick={() => onDeleteUser(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
