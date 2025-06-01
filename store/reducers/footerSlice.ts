import { createSlice } from '@reduxjs/toolkit';

interface FooterState {
  socialLinks: {
    twitter: string;
    instagram: string;
    discord: string;
    github: string;
  };
}

const initialState: FooterState = {
  socialLinks: {
    twitter: '#',
    instagram: '#',
    discord: '#',
    github: '#',
  },
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
});

export default footerSlice.reducer;