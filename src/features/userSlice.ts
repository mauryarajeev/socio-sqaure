import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  registered: boolean;
  userInfo: {
    id: number;
    name: string;
    email: string;
    username: string;
  } | null;
}

const initialState: UserState = {
  registered: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.registered = true;
      state.userInfo = action.payload;
    },
  },
});

export const { registerSuccess } = userSlice.actions;
export default userSlice.reducer;
