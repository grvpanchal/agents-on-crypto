import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../reducers/categoriesSlice';

function* fetchCategoriesSaga() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/categories`)
    const data = yield call([res, 'json'])
    yield put(fetchCategoriesSuccess(data))
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    yield put(fetchCategoriesFailure(errorMessage))
  }
}

export function* watchCategories() {
  yield takeLatest(fetchCategories.type, fetchCategoriesSaga);
}