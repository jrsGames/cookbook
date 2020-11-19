import { GlobalState, Cookbook } from "./initialState"

export const getView: (state: GlobalState) => string =
	(state) => state.generalState.view;

export const getCookbook: (state: GlobalState) => Cookbook | null =
	(state) => state.bookState.cookbook || null;
	
export const getCookbookString: (state: GlobalState) => string =
	(state) => state.bookState.cookbookString || "";