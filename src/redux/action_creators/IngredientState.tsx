import { ACTION_ADD_INGREDIENT } from "../actions";

export const addIngredientName = (name: string) => ({
	type: ACTION_ADD_INGREDIENT, payload: {name}
});