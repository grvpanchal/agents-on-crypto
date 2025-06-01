import { call, put, takeLatest } from 'redux-saga/effects';
import { mockNFTs } from '@/lib/mockData';
import {
  fetchNFTs,
  fetchNFTsSuccess,
  fetchNFTsFailure,
} from '../reducers/nftSlice';

function* fetchNFTsSaga() {
  try {
    // Simulate API call
    yield new Promise(resolve => setTimeout(resolve, 1000));
    yield put(fetchNFTsSuccess(mockNFTs));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred while fetching NFTs';
    yield put(fetchNFTsFailure(errorMessage));
  }
}

export function* watchNFTs() {
  yield takeLatest(fetchNFTs.type, fetchNFTsSaga);
}