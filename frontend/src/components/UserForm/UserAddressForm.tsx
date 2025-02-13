import React from 'react';

const UserAddressForm = ({ register, errors }: any) => {
  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">User Address</h2>

      <div>
        <label className="block text-sm font-medium text-gray-900">Address</label>
        <input
          {...register('address', { required: true })}
          placeholder="Enter your address"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">City</label>
        <input
          {...register('city', { required: true })}
          placeholder="Enter your city"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">City is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">State</label>
        <input
          {...register('state', { required: true })}
          placeholder="Enter your state"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.state && <p className="text-red-500 text-sm mt-1">State is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Country</label>
        <input
          {...register('country', { required: true })}
          placeholder="Enter your country"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.country && <p className="text-red-500 text-sm mt-1">Country is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Zip Code</label>
        <input
          {...register('zipCode', { required: true })}
          placeholder="Enter your zip code"
          className="mt-2 block w-full border border-blue-500 rounded-lg shadow-sm p-3 bg-white text-gray-900 placeholder-gray-500"
        />
        {errors.zipCode && <p className="text-red-500 text-sm mt-1">Zip Code is required</p>}
      </div>
    </div>
  );
};

export default UserAddressForm;
