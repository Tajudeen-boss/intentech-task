import React from 'react';

const UserInfoForm = ({ register, errors }: any) => {
  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">User Information</h2>

      <div>
        <label>Profile Photo (URL or File)</label>

        {/* URL Input */}
        <input
          type="text"
          placeholder="Enter image URL"
          {...register("profilePhoto")}
          className="border rounded p-2 w-full"
        />

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          {...register("profilePhoto")}
          className="border rounded p-2 w-full mt-2"
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-900">First Name</label>
        <input
          {...register('firstName', { required: true })}
          placeholder="Enter your first name"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">First Name is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Last Name</label>
        <input
          {...register('lastName', { required: true })}
          placeholder="Enter your last name"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">Last Name is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Date of Birth</label>
        <input
          type="date"
          {...register('dob', { required: true })}
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900"
        />
        {errors.dob && <p className="text-red-500 text-sm mt-1">Date of Birth is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Occupation</label>
        <input
          {...register('occupation', { required: true })}
          placeholder="Enter your occupation"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.occupation && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Gender</label>
        <select
          {...register('gender', { required: true })}
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">Gender is required</p>}
      </div>
    </div>
  );
};

export default UserInfoForm;
