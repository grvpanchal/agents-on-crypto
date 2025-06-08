import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../reducers/categoriesSlice';

function* fetchCategoriesSaga(): Generator<any, void, any> {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res = yield call(fetch, `${base}/api/categories`)
    const data = yield call([res, 'json'])
    yield put(fetchCategoriesSuccess(data))
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    yield put(fetchCategoriesFailure(errorMessage))
  }
}

export function* watchCategories(): Generator<any, void, any> {
  yield takeLatest(fetchCategories.type, fetchCategoriesSaga)
}