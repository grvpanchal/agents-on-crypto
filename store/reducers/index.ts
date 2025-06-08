import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from './headerSlice';
import footerReducer from './footerSlice';
import categoriesReducer from './categoriesSlice';
import nftReducer from './nftSlice';
import accountReducer from './accountSlice';
import agentReducer from './agentSlice';

const rootReducer = combineReducers({
  header: headerReducer,
  footer: footerReducer,
  categories: categoriesReducer,
  nft: nftReducer,
  account: accountReducer,
  agents: agentReducer,
});

export default rootReducer;