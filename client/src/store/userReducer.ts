import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersResponse } from '../classes';

interface UserState {
  users: { [page: number]: User[] };
  total: number;
  currentPage: number;
  pages: number;
}

const initialState: UserState = {
  users: {},
  total: 0,
  currentPage: 1,
  pages: 1,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ page: number; data: UsersResponse }>) => {
      const { page, data } = action.payload;
      state.users = {
        ...state.users,
        [page]: data.users
      };
      state.total = data.total;
      state.pages = data.pages;
      state.currentPage = page;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCache: (state) => {
      state.users = {};
    },
  },
});

export const { setUsers, setCurrentPage, clearCache } = userSlice.actions;
export default userSlice.reducer;