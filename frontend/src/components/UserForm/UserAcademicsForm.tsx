import React from 'react';

const UserAcademicsForm = ({ register, errors }: any) => {
  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">User Academic Background</h2>

      <div>
        <label className="block text-sm font-medium text-gray-900">Past Schools</label>
        <input
          {...register('academicBackground', { required: true })}
          placeholder="Enter past schools or universities"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.academicBackground && <p className="text-red-500 text-sm mt-1">Academic background is required</p>}
      </div>
    </div>
  );
};

export default UserAcademicsForm;
