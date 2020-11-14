import { GlobalState } from "./initialState"

export const getView: (state: GlobalState) => string =
	(state) => state.generalState.view;
	
export const getPassword: (state: GlobalState) => string =
	(state) => state.generalState.password;
	
export const getStopIndex: (state: GlobalState) => number =
	(state) => state.tourState.stopIndex;