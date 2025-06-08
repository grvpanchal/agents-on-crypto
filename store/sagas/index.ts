import { all } from 'redux-saga/effects';
import { watchCategories } from './categoriesSaga';
import { watchNFTs } from './nftSaga';
import { watchAccount } from './accountSaga';
import { watchAgents } from './agentSaga';

export default function* rootSaga(): Generator<any, void, any> {
  yield all([
    watchCategories(),
    watchNFTs(),
    watchAccount(),
    watchAgents(),
  ]);
}