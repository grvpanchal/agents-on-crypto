import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from '@/types/nft';

export type SortOption = 'recent' | 'alphabetical-asc' | 'alphabetical-desc' | 'items' | 'volume' | 'floor';
export type ViewMode = 'grid' | 'list';

interface CategoriesState {
  items: CategoryType[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  sortBy: SortOption;
  viewMode: ViewMode;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
  sortBy: 'recent',
  viewMode: 'grid',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategories: (state) => {
      state.loading = true;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<CategoryType[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  setSelectedCategory,
  setSortBy,
  setViewMode,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;