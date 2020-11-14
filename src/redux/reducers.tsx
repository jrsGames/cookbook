import { combineReducers } from 'redux';
import {
	GeneralState,
	initialGeneralState,
} from './initialState';
import {
	Action,
	ACTION_SET_VIEW,
	ACTION_SET_PASSWORD,
	ActionSetGeneralState
} from './actions';

/* GENERALSTATE */
export function generalReducer(
	state: GeneralState = initialGeneralState,
	action: Action<ActionSetGeneralState>
) {
	switch(action.type) {
		case ACTION_SET_VIEW: return {
			...state,
			view: action.payload.view || state.view
		};
		case ACTION_SET_PASSWORD: return {
			...state,
			password: action.payload.password || state.password
		};
		default: return state;
	}	
}

export const reducers = combineReducers({
	generalState: generalReducer
});