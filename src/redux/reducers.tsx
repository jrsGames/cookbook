import { combineReducers } from 'redux';
import {
	GeneralState,
	BookState,
	initialGeneralState,
	initialBookState,
	Cookbook
} from './initialState';
import {
	Action,
	ACTION_SET_VIEW,
	ActionSetGeneralState,
	ACTION_SET_COOKBOOK,
	ActionSetBookState,
	ACTION_SET_COOKBOOK_STRING,
	ACTION_DELETE_RECIPE} from './actions';
import { getRecipeIndexById } from '../components/ReadModePage/readModePage';

/* GENERALSTATE */
export function generalReducer(
	state: GeneralState = initialGeneralState,
	action: Action<ActionSetGeneralState>
) {
	switch(action.type) {
		case ACTION_SET_VIEW: return {
			...state,
			view: action.payload.view || state.view
		};
		default: return state;
	}	
}

/* BOOKSTATE */
export function bookReducer(
	state: BookState = initialBookState,
	action: Action<ActionSetBookState>
) {
	switch(action.type) {
		case ACTION_SET_COOKBOOK: return {
			...state,
			cookbook: action.payload.cookbook
		};
		case ACTION_SET_COOKBOOK_STRING: return {
			...state,
			cookbookString: action.payload.cookbookString
		};
		case ACTION_DELETE_RECIPE: {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(state.cookbook));
			const recipeIndex = getRecipeIndexById(newCookbook.recipes, action.payload.recipeId);
			newCookbook.recipes.splice(recipeIndex, 1);
			return {
				...state,
				cookbook: newCookbook
			};
		}
		default: return state;
	}	
}

export const reducers = combineReducers({
	generalState: generalReducer,
	bookState: bookReducer
});