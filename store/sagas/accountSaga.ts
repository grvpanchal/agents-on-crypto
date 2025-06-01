import { call, put, takeLatest } from 'redux-saga/effects';
import { mockNFTs } from '@/lib/mockData';
import {
  fetchOwnedNFTs,
  fetchOwnedNFTsSuccess,
  fetchOwnedNFTsFailure,
} from '../reducers/accountSlice';

function* fetchOwnedNFTsSaga() {
  try {
    // Simulate API call
    yield new Promise(resolve => setTimeout(resolve, 1000));
    const ownedNFTs = mockNFTs.slice(0, 3); // Mock owned NFTs
    yield put(fetchOwnedNFTsSuccess(ownedNFTs));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchOwnedNFTsFailure(errorMessage));
  }
}

export function* watchAccount() {
  yield takeLatest(fetchOwnedNFTs.type, fetchOwnedNFTsSaga);
}