import { ACTION_SET_COOKBOOK, ACTION_SET_COOKBOOK_STRING, ACTION_DELETE_RECIPE } from "../actions";
import { Cookbook } from "../initialState";

export const setCookbook = (cookbook: Cookbook) => ({
	type: ACTION_SET_COOKBOOK, payload: {cookbook}
});

export const setCookbookString = (cookbookString: string) => ({
	type: ACTION_SET_COOKBOOK_STRING, payload: {cookbookString}
});

export const deleteRecipe = (recipeId: string) => ({
	type: ACTION_DELETE_RECIPE, payload: {recipeId}
});