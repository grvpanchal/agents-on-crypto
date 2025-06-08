import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchNFTs,
  fetchNFTsSuccess,
  fetchNFTsFailure,
  uploadNFT,
  uploadNFTSuccess,
  uploadNFTFailure,
} from '../reducers/nftSlice';

function* fetchNFTsSaga() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/nfts`)
    const data = yield call([res, 'json'])
    yield put(fetchNFTsSuccess(data))
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred while fetching NFTs'
    yield put(fetchNFTsFailure(errorMessage))
  }
}

function* uploadNFTSaga(action: ReturnType<typeof uploadNFT>) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/nfts/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    })
    const data = yield call([res, 'json'])
    yield put(uploadNFTSuccess(data))
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload NFT'
    yield put(uploadNFTFailure(errorMessage))
  }
}

export function* watchNFTs() {
  yield takeLatest(fetchNFTs.type, fetchNFTsSaga)
  yield takeLatest(uploadNFT.type, uploadNFTSaga)
}