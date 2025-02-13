import React from 'react';
import UserForm from '../../components/UserForm/Userform';

const CreateUserPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm />
    </div>
  );
};

export default CreateUserPage;