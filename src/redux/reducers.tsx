import { combineReducers } from 'redux';
import {
	GeneralState,
	TourState,
	initialGeneralState,
	initialTourState
} from './initialState';
import {
	Action,
	ACTION_SET_VIEW,
	ACTION_SET_PASSWORD,
	ActionSetGeneralState,
	ACTION_SET_STOP_INDEX,
	ActionSetTourState,} from './actions';

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
export function tourReducer(
	state: TourState = initialTourState,
	action: Action<ActionSetTourState>
) {
	switch(action.type) {
		case ACTION_SET_STOP_INDEX: return {
			...state,
			stopIndex: action.payload.stopIndex
		};
		default: return state;
	}	
}

export const reducers = combineReducers({
	generalState: generalReducer,
	tourState: tourReducer
});