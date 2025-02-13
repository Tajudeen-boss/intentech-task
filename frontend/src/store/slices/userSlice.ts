import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser } from '../../utils/api';
import { UserInfo, UserContact, UserAddress, UserAcademics } from "../../types/user";

interface User {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  email?: string;
  phoneNumber?: string;
  fax?: string;
  linkedInUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  academicBackground?: string[];
}

interface UserState {
  users: User[];
  user: User | null; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  status: 'idle',
  error: null,
};


export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const data = await fetchUsers();
  console.log("Backend Response:", data);

  if (!data || !data.userInfos) {
    throw new Error("Invalid backend response");
  }

  // Ensure arrays are valid
  const userContacts = Array.isArray(data.userContacts) ? data.userContacts : [];
  const userAddresses = Array.isArray(data.userAddresses) ? data.userAddresses : [];
  const userAcademics = Array.isArray(data.userAcademics) ? data.userAcademics : [];

  // Convert arrays into lookup objects
  const userContactsMap: Record<number, UserContact> = Object.fromEntries(
    userContacts.map((c: UserContact) => [c.id, c])
  );
  const userAddressesMap: Record<number, UserAddress> = Object.fromEntries(
    userAddresses.map((a: UserAddress) => [a.id, a])
  );
  const userAcademicsMap: Record<number, UserAcademics> = Object.fromEntries(
    userAcademics.map((ac: UserAcademics) => [ac.id, ac])
  );

  // Map userInfos to create a complete user object
  const users: User[] = data.userInfos.map((userInfo: UserInfo) => ({
    id: userInfo.id,
    profilePhoto: userInfo.profilePhoto || '',
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    dob: userInfo.dob || '',
    occupation: userInfo.occupation || '',
    gender: userInfo.gender || '',
    email: userContactsMap[userInfo.id]?.email || '',
    phoneNumber: userContactsMap[userInfo.id]?.phoneNumber || '',
    fax: userContactsMap[userInfo.id]?.fax || '',
    linkedInUrl: userContactsMap[userInfo.id]?.linkedInUrl || '',
    address: userAddressesMap[userInfo.id]?.address || '',
    city: userAddressesMap[userInfo.id]?.city || '',
    state: userAddressesMap[userInfo.id]?.state || '',
    country: userAddressesMap[userInfo.id]?.country || '',
    zipCode: userAddressesMap[userInfo.id]?.zipCode || '',
    academicBackground: userAcademicsMap[userInfo.id]?.schools || [],
  }));

  console.log("Mapped Users:", users);
  return users;
});

//  Fetch Single User by ID
export const fetchUserByIdAsync = createAsyncThunk(
  "users/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchUserById(id);
      console.log("Fetched User Data:", data); // Debugging

      if (!data || !data.userInfo) {
        throw new Error("Invalid user data");
      }

      const user: User = {
        id: data.userInfo.id,
        profilePhoto: data.userInfo.profilePhoto || '',
        firstName: data.userInfo.firstName || '',
        lastName: data.userInfo.lastName || '',
        dob: data.userInfo.dob || '',
        occupation: data.userInfo.occupation || '',
        gender: data.userInfo.gender || '',
        email: data.userContact?.email || '',
        phoneNumber: data.userContact?.phoneNumber || '',
        fax: data.userContact?.fax || '',
        linkedInUrl: data.userContact?.linkedInUrl || '',
        address: data.userAddress?.address || '',
        city: data.userAddress?.city || '',
        state: data.userAddress?.state || '',
        country: data.userAddress?.country || '',
        zipCode: data.userAddress?.zipCode || '',
        academicBackground: data.userAcademics?.schools || [],
      };

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return rejectWithValue("Failed to fetch user");
    }
  }
);



// Create User
export const createUserAsync = createAsyncThunk(
  'users/createUser',
  async (userData: any) => {
    const response = await createUser(userData);
    return response;
  }
);

//  Update User
export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUser(userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue("Failed to update user");
    }
  }
);

//  Delete User
export const deleteUserAsync = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    await deleteUser(userId);
    return userId;
  }
);

//  Redux Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Users
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Fetch User by ID
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Create User
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Update User
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.user = action.payload; 
      })

      // Delete User
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
