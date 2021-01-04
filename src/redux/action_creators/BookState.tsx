import {
	ACTION_SET_COOKBOOK,
	ACTION_SET_COOKBOOK_STRING,
	ACTION_DELETE_RECIPE,
	ACTION_COPY_RECIPE,
	ACTION_SWAP_RECIPES,
	ACTION_UPDATE_RECIPE,
	ACTION_RESTORE_COOKBOOK,
	ACTION_MOVE_RECIPE
} from "../actions";
import { Cookbook, Recipe } from "../initialState";

export const setCookbook = (cookbook: Cookbook | null) => ({
	type: ACTION_SET_COOKBOOK, payload: {cookbook}
});

export const restoreCookbook = () => ({
	type: ACTION_RESTORE_COOKBOOK, payload: {}
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

export const moveRecipe = (oldIndex: number, newIndex: number) => ({
	type: ACTION_MOVE_RECIPE, payload: {oldIndex, newIndex}
});

export const updateRecipe = (id: string, newRecipe: Recipe) => ({
	type: ACTION_UPDATE_RECIPE, payload: {id, newRecipe}
})