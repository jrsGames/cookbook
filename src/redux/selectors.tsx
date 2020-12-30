import { GlobalState, Cookbook } from "./initialState"

export const getView: (state: GlobalState) => string =
	(state) => state.viewState.view;

export const getFileName: (state: GlobalState) => string =
	(state) => state.viewState.fileName;

export const getCookbook: (state: GlobalState) => Cookbook | null =
	(state) => state.bookState.cookbook || null;
	
export const getCookbookString: (state: GlobalState) => string =
	(state) => state.bookState.cookbookString || "";
	
export const getIncludedLabels: (state: GlobalState) => string[] =
	(state) => state.filterState.include;
	
export const getExcludedLabels: (state: GlobalState) => string[] =
	(state) => state.filterState.exclude;
	
export const getIngredientNames: (state: GlobalState) => string[] =
	(state) => state.ingredientState.ingredients;