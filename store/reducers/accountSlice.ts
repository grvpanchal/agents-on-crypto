import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NFTType } from '@/types/nft';

interface AccountState {
  profile: {
    username: string;
    bio: string;
    website: string;
  };
  ownedNFTs: NFTType[];
  favoriteNFTs: NFTType[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  profile: {
    username: '',
    bio: '',
    website: '',
  },
  ownedNFTs: [],
  favoriteNFTs: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<typeof initialState.profile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    fetchOwnedNFTs: (state) => {
      state.loading = true;
    },
    fetchOwnedNFTsSuccess: (state, action: PayloadAction<NFTType[]>) => {
      state.ownedNFTs = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchOwnedNFTsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavoriteNFT: (state, action: PayloadAction<NFTType>) => {
      const index = state.favoriteNFTs.findIndex(nft => nft.id === action.payload.id);
      if (index === -1) {
        state.favoriteNFTs.push(action.payload);
      } else {
        state.favoriteNFTs.splice(index, 1);
      }
    },
  },
});

export const {
  updateProfile,
  fetchOwnedNFTs,
  fetchOwnedNFTsSuccess,
  fetchOwnedNFTsFailure,
  toggleFavoriteNFT,
} = accountSlice.actions;
export default accountSlice.reducer;