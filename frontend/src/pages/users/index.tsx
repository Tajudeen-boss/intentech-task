import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsersAsync, deleteUserAsync } from '../../store/slices/userSlice';
import UserList from '../../components/UserList';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    await dispatch(deleteUserAsync(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserList users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default UsersPage;