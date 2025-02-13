import React from 'react';

const UserContactForm = ({ register, errors }: any) => {
  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">User Contact</h2>

      <div>
        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input 
          type="email" 
          {...register('email', { required: true })} 
          placeholder="Enter your email"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Phone Number</label>
        <input 
          {...register('phoneNumber', { required: true })} 
          placeholder="Enter your phone number"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">Phone Number is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Fax (Optional)</label>
        <input 
          {...register('fax')} 
          placeholder="Enter your fax number (optional)"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">LinkedIn URL (Optional)</label>
        <input 
          {...register('linkedInUrl')} 
          placeholder="Enter your LinkedIn profile URL (optional)"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default UserContactForm;
