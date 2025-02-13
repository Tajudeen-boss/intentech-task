import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../store/hooks';
import { createUserAsync } from '../../store/slices/userSlice';
import UserInfoForm from './UserInfoForm';
import UserContactForm from './UserContactForm';
import UserAddressForm from './UserAddressForm';
import UserAcademicsForm from './UserAcademicsForm';
import ResumePreview from './ResumePreview';

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [isReviewing, setIsReviewing] = useState(false); // ✅ Track review state
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    let profilePhotoUrl = data.profilePhoto;

    if (data.profilePhoto && data.profilePhoto[0] instanceof File) {
      profilePhotoUrl = URL.createObjectURL(data.profilePhoto[0]);
    }

    const formattedData = {
      userInfo: {
        profilePhoto: profilePhotoUrl,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        occupation: data.occupation,
        gender: data.gender,
      },
      userContact: {
        email: data.email,
        phoneNumber: data.phoneNumber,
        fax: data.fax,
        linkedInUrl: data.linkedInUrl,
      },
      userAddress: {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
      userAcademics: {
        pastSchools: Array.isArray(data.academicBackground)
          ? data.academicBackground
          : [data.academicBackground],
      },
    };

    console.log("Formatted Data before dispatch:", formattedData);

    try {
      await dispatch(createUserAsync(formattedData)).unwrap();
      router.push('/'); // ✅ Redirect to homepage after final submission
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const reviewStep = () => setIsReviewing(true); // ✅ Enter review mode
  const editStep = () => setIsReviewing(false); // ✅ Exit review mode

  const renderStep = () => {
    if (step === 5 && isReviewing) {
      return <ResumePreview watch={watch} />;
    }

    switch (step) {
      case 1:
        return <UserInfoForm register={register} errors={errors} />;
      case 2:
        return <UserContactForm register={register} errors={errors} />;
      case 3:
        return <UserAddressForm register={register} errors={errors} />;
      case 4:
        return <UserAcademicsForm register={register} errors={errors} />;
      case 5:
        return <ResumePreview watch={watch} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
      {renderStep()}
      <div className="flex justify-between mt-6">
        {step > 1 && !isReviewing && (
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Previous
          </button>
        )}

        {step < 5 && (
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Next
          </button>
        )}

        {step === 5 && !isReviewing && (
          <button
            type="button"
            onClick={reviewStep} // ✅ Click to review before submitting
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Review & Submit
          </button>
        )}

        {step === 5 && isReviewing && (
          <>
            <button
              type="button"
              onClick={editStep} // ✅ Go back to edit mode
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Edit
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserForm;
