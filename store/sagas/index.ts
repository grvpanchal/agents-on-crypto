import { all } from 'redux-saga/effects';
import { watchCategories } from './categoriesSaga';
import { watchNFTs } from './nftSaga';
import { watchAccount } from './accountSaga';

export default function* rootSaga() {
  yield all([
    watchCategories(),
    watchNFTs(),
    watchAccount(),
  ]);
}