import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  status: string;
}

// Define the initial state
interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

// Create the Redux slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push({ ...action.payload, id: crypto.randomUUID() });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

// Export actions
export const { addUser, updateUser, deleteUser, setUsers } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
