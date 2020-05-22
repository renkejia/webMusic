import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/recommend/store';
import { reducer as singerReducer } from '../pages/singer/store'
import { reducer as rankReducer } from '../pages/rank/store';

export default combineReducers ({
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
});