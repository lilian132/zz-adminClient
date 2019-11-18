import { combineReducers } from 'redux';
import { globalReducer } from './global';
import { homeReducer } from '@/views/Home/redux';

const reducer = combineReducers({
  storeGloabl: globalReducer,
  storeHome: homeReducer,
});

export default reducer;
