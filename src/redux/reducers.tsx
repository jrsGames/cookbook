import { combineReducers } from 'redux';
import {
	GeneralState,
	BookState,
	initialGeneralState,
	initialBookState
} from './initialState';
import {
	Action,
	ACTION_SET_VIEW,
	ACTION_SET_PASSWORD,
	ActionSetGeneralState,
	ACTION_SET_COOKBOOK,
	ActionSetBookState,} from './actions';

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

/* TOURSTATE */
export function bookReducer(
	state: BookState = initialBookState,
	action: Action<ActionSetBookState>
) {
	switch(action.type) {
		case ACTION_SET_COOKBOOK: return {
			...state,
			cookbook: action.payload.cookbook
		};
		default: return state;
	}	
}

export const reducers = combineReducers({
	generalState: generalReducer,
	bookState: bookReducer
});