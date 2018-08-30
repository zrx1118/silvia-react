import { createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from './home/reducer';
import * as pro from './production/reducer';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({...home, ...pro}),
    applyMiddleware(thunk)
)

export default store;