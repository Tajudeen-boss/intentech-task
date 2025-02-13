import React from 'react';
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';

const ResumePreview = ({ watch }: any) => {
  const formData = watch();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Resume Preview</h2>
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-4">
        {/* Profile Photo & Name */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={formData.profilePhoto?.[0] ? URL.createObjectURL(formData.profilePhoto[0]) : '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
          <h3 className="text-2xl font-semibold text-gray-900">{formData.firstName} {formData.lastName}</h3>
          <p className="text-blue-600 text-sm">{formData.occupation || 'Occupation not provided'}</p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Contact Info */}
        <div className="space-y-3">
          <p className="flex items-center text-gray-700">
            <Mail className="w-5 h-5 text-blue-500 mr-2" />
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="flex items-center text-gray-700">
            <Phone className="w-5 h-5 text-blue-500 mr-2" />
            <strong>Phone:</strong> {formData.phoneNumber}
          </p>
          <p className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 text-blue-500 mr-2" />
            <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}, {formData.country}, {formData.zipCode}
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Academic Background */}
        <div>
          <p className="flex items-center text-gray-800 font-semibold">
            <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
            Academic Background:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            {Array.isArray(formData.academicBackground) ? (
              formData.academicBackground.map((school: string, index: number) => (
                <li key={index} className="">{school}</li>
              ))
            ) : (
              <li>{formData.academicBackground || 'No academic background provided'}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
