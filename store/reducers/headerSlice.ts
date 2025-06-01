import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  isMobileMenuOpen: boolean;
  searchQuery: string;
}

const initialState: HeaderState = {
  isMobileMenuOpen: false,
  searchQuery: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleMobileMenu, setSearchQuery } = headerSlice.actions;
export default headerSlice.reducer;