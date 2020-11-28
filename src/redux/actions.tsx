import { Cookbook } from "./initialState";

export interface Action<T> {
	type: string;
	payload: T;
}

/* GENERALSTATE */
export const ACTION_SET_VIEW = "setView";
export interface ActionSetView {
	view: string
}

/* BOOKSTATE */
export const ACTION_SET_COOKBOOK = "setCookbook";
export interface ActionSetCookbook {
	cookbook: Cookbook
}
export const ACTION_SET_COOKBOOK_STRING = "setCookbookString";
export interface ActionSetCookbookString {
	cookbookString: string
}
export const ACTION_DELETE_RECIPE = "deleteRecipe";
export interface ActionDeleteRecipe {
	recipeId: string
}
export const ACTION_COPY_RECIPE = "copyRecipe";
export interface ActionCopyRecipe {
	recipeId: string,
	newRecipeId: string
}

export const ACTION_SWAP_RECIPES = "swapRecipes";
export interface ActionSwapRecipes {
	firstRecipeId: string,
	secondRecipeId: string
}

export interface ActionSetGeneralState extends ActionSetView {};
export interface ActionSetBookState extends
	ActionSetCookbook, ActionSetCookbookString, ActionDeleteRecipe, ActionCopyRecipe, ActionSwapRecipes{};