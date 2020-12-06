import { GlobalState, Cookbook } from "./initialState"

export const getView: (state: GlobalState) => string =
	(state) => state.viewState.view;

export const getCookbook: (state: GlobalState) => Cookbook | null =
	(state) => state.bookState.cookbook || null;
	
export const getCookbookString: (state: GlobalState) => string =
	(state) => state.bookState.cookbookString || "";