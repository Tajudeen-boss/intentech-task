import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUserByIdAsync } from "../../store/slices/userSlice";
import UserDetail from "../../components/UserDetail";

const UserDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      dispatch(fetchUserByIdAsync(Number(id))); 
    }
  }, [dispatch, id]);
  

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <UserDetail user={user} />
    </div>
  );
};

export default UserDetailPage;
