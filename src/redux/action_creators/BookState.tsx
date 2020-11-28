import { ACTION_SET_COOKBOOK, ACTION_SET_COOKBOOK_STRING, ACTION_DELETE_RECIPE, ACTION_COPY_RECIPE, ACTION_SWAP_RECIPES } from "../actions";
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

export const copyRecipe = (recipeId: string) => ({
	type: ACTION_COPY_RECIPE, payload: {recipeId}
});

export const swapRecipes = (firstRecipeId: string, secondRecipeId: string) => ({
	type: ACTION_SWAP_RECIPES, payload: {firstRecipeId, secondRecipeId}
});