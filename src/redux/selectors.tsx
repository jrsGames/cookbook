import { GlobalState, Cookbook } from "./initialState"

export const getView: (state: GlobalState) => string =
	(state) => state.generalState.view;
	
export const getPassword: (state: GlobalState) => string =
	(state) => state.generalState.password;
	
export const getCookbook: (state: GlobalState) => Cookbook | null =
	(state) => state.bookState.cookbook || null;