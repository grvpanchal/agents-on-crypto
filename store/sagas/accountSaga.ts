import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchOwnedNFTs,
  fetchOwnedNFTsSuccess,
  fetchOwnedNFTsFailure,
} from '../reducers/accountSlice';

function* fetchOwnedNFTsSaga() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/nfts`)
    const data = yield call([res, 'json'])
    const ownedNFTs = data.slice(0, 3)
    yield put(fetchOwnedNFTsSuccess(ownedNFTs))
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    yield put(fetchOwnedNFTsFailure(errorMessage))
  }
}

export function* watchAccount() {
  yield takeLatest(fetchOwnedNFTs.type, fetchOwnedNFTsSaga);
}