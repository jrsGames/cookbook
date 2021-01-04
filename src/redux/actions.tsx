import { Cookbook, Recipe } from "./initialState";

export interface Action<T> {
	type: string;
	payload: T;
}

/* VIEWSTATE */
export const ACTION_SET_VIEW = "setView";
export interface ActionSetView {
	view: string
}
export const ACTION_SET_FILE_NAME = "setFileName";
export interface ActionSetFileName {
	fileName: string
}

/* BOOKSTATE */
export const ACTION_SET_COOKBOOK = "setCookbook";
export interface ActionSetCookbook {
	cookbook: Cookbook
}
export const ACTION_RESTORE_COOKBOOK = "restoreCookbook";

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
	recipeId: string
}
export const ACTION_SWAP_RECIPES = "swapRecipes";
export interface ActionSwapRecipes {
	firstRecipeId: string,
	secondRecipeId: string
}
export const ACTION_MOVE_RECIPE = "moveRecipe";
export interface ActionMoveRecipe {
	oldIndex: number,
	newIndex: number
}
export const ACTION_UPDATE_RECIPE = "updateRecipe";
export interface ActionUpdateRecipe {
	id: string,
	newRecipe: Recipe
}
export const ACTION_SET_INCLUDE = "setIncludedLabels";
export const ACTION_SET_EXCLUDE = "setExcludedLabels";

export interface ActionSetViewState extends ActionSetView, ActionSetFileName {};
export interface ActionSetBookState extends
	ActionSetCookbook,
	ActionSetCookbookString,
	ActionDeleteRecipe,
	ActionCopyRecipe,
	ActionSwapRecipes,
	ActionMoveRecipe,
	ActionUpdateRecipe {};
export interface ActionSetFilterState {
	labels: string[]
};
/* INGREDIENTSTATE */
export const ACTION_ADD_INGREDIENT = "addIngredient";
export interface ActionSetIngredientState {
	name: string
}