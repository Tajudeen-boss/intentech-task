import React from 'react';

const UserDetail = ({ user }: { user: any }) => {
  if (!user) {
    return <p className="text-red-500 text-center font-semibold">User data not available.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
      {/* Profile Photo */}
      <div className="flex flex-col items-center space-y-4">
        {user.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-32 h-32 object-cover rounded-full shadow-md"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 text-lg">
            No Image
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600 italic">{user.occupation || "Occupation not available"}</p>
      </div>

      {/* User Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold text-black">📧 Email:</p>
          <p className="text-gray-700">{user.email || "Not provided"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold text-black">📞 Phone:</p>
          <p className="text-gray-700">{user.phoneNumber || "Not provided"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold text-black">🌍 LinkedIn:</p>
          {user.linkedInUrl ? (
            <a
              href={user.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Profile
            </a>
          ) : (
            <p className="text-gray-700">Not available</p>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold text-black">📠 Fax:</p>
          <p className="text-gray-700">{user.fax || "Not provided"}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="font-semibold text-black">📍 Address:</p>
        <p className="text-gray-700">
          {user.address ? (
            <>
              {user.address}, {user.city}, {user.state}, {user.country} - {user.zipCode}
            </>
          ) : (
            "Address not available"
          )}
        </p>
      </div>

      {/* Academic Background */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="font-semibold text-black">🎓 Academic Background:</p>
        {user.academicBackground && user.academicBackground.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {user.academicBackground.map((school: string, index: number) => (
              <li key={index}>{school}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No academic background available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
