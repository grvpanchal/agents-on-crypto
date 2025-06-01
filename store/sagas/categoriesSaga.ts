import { call, put, takeLatest } from 'redux-saga/effects';
import { mockCategories } from '@/lib/mockData';
import {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../reducers/categoriesSlice';

function* fetchCategoriesSaga() {
  try {
    // Simulate API call
    yield new Promise(resolve => setTimeout(resolve, 1000));
    yield put(fetchCategoriesSuccess(mockCategories));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchCategoriesFailure(errorMessage));
  }
}

export function* watchCategories() {
  yield takeLatest(fetchCategories.type, fetchCategoriesSaga);
}