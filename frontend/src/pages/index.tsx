import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsersAsync, deleteUserAsync } from '../store/slices/userSlice';
import UserList from '../components/UserList';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    await dispatch(deleteUserAsync(id));
    dispatch(fetchUsersAsync()); // Refresh the list after deletion
  };

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserList users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default HomePage;