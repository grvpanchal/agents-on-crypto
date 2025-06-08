import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NFTType } from '@/types/nft';

interface NFTState {
  items: NFTType[];
  loading: boolean;
  error: string | null;
  selectedNFT: NFTType | null;
  filters: {
    priceRange: [number, number];
    collections: string[];
    properties: string[];
    searchTerm: string;
  };
}

const initialState: NFTState = {
  items: [],
  loading: false,
  error: null,
  selectedNFT: null,
  filters: {
    priceRange: [0, 10],
    collections: [],
    properties: [],
    searchTerm: '',
  },
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    fetchNFTs: (state) => {
      state.loading = true;
    },
    fetchNFTsSuccess: (state, action: PayloadAction<NFTType[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchNFTsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadNFT: (state, _action: PayloadAction<Partial<NFTType>>) => {
      state.loading = true;
    },
    uploadNFTSuccess: (state, action: PayloadAction<NFTType>) => {
      state.items.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    uploadNFTFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedNFT: (state, action: PayloadAction<NFTType>) => {
      state.selectedNFT = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    toggleCollection: (state, action: PayloadAction<string>) => {
      const collection = action.payload;
      const index = state.filters.collections.indexOf(collection);
      if (index === -1) {
        state.filters.collections.push(collection);
      } else {
        state.filters.collections.splice(index, 1);
      }
    },
    toggleProperty: (state, action: PayloadAction<string>) => {
      const property = action.payload;
      const index = state.filters.properties.indexOf(property);
      if (index === -1) {
        state.filters.properties.push(property);
      } else {
        state.filters.properties.splice(index, 1);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchNFTs,
  fetchNFTsSuccess,
  fetchNFTsFailure,
  setSelectedNFT,
  setPriceRange,
  toggleCollection,
  toggleProperty,
  setSearchTerm,
  resetFilters,
  uploadNFT,
  uploadNFTSuccess,
  uploadNFTFailure,
} = nftSlice.actions;
export default nftSlice.reducer;