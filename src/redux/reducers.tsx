import { combineReducers } from 'redux';
import {
	ViewState,
	BookState,
	FilterState,
	initialViewState,
	initialBookState,
	initialFilterState,
	Cookbook,
	Recipe
} from './initialState';
import {
	Action,
	ACTION_SET_VIEW,
	ActionSetViewState,
	ACTION_SET_COOKBOOK,
	ActionSetBookState,
	ACTION_SET_COOKBOOK_STRING,
	ACTION_DELETE_RECIPE,
	ACTION_COPY_RECIPE,
	ACTION_SWAP_RECIPES,
	ACTION_UPDATE_RECIPE,
	ActionSetFilterState,
	ACTION_SET_INCLUDE,
	ACTION_SET_EXCLUDE,
	ACTION_RESTORE_COOKBOOK} from './actions';
import { getRecipeIndexById } from '../components/ReadModePage/readModePage';
import { generateId, parseToCookbook } from '../components/UploadInput/uploadInput';


/* VIEWSTATE */
export function viewReducer(
	state: ViewState = initialViewState,
	action: Action<ActionSetViewState>
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
		case ACTION_COPY_RECIPE: {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(state.cookbook));
			const recipeIndex = getRecipeIndexById(newCookbook.recipes, action.payload.recipeId);
			const copiedRecipe: Recipe = JSON.parse(JSON.stringify(newCookbook.recipes[recipeIndex]));
			copiedRecipe.id = generateId();
			newCookbook.recipes.splice(recipeIndex + 1, 0, copiedRecipe);
			return {
				...state,
				cookbook: newCookbook
			};
		}
		case ACTION_RESTORE_COOKBOOK: {
			return {
				...state,
				cookbook: parseToCookbook(state.cookbookString || "")
			}
		}
		case ACTION_SWAP_RECIPES: {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(state.cookbook));
			const firstRecipeIndex = getRecipeIndexById(newCookbook.recipes, action.payload.firstRecipeId);
			const secondRecipeIndex = getRecipeIndexById(newCookbook.recipes, action.payload.secondRecipeId);
			const temp = newCookbook.recipes[firstRecipeIndex];
			newCookbook.recipes[firstRecipeIndex] = newCookbook.recipes[secondRecipeIndex];
			newCookbook.recipes[secondRecipeIndex] = temp;
			return {
				...state,
				cookbook: newCookbook
			};
		}
		case ACTION_UPDATE_RECIPE: {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(state.cookbook));
			const recipeIndex = getRecipeIndexById(newCookbook.recipes, action.payload.id);
			newCookbook.recipes[recipeIndex] = action.payload.newRecipe;
			return {
				...state,
				cookbook: newCookbook
			};
		}
		default: return state;
	}	
}

/* FILTERSTATE */
export function filterReducer(
	state: FilterState = initialFilterState,
	action: Action<ActionSetFilterState>
) {
	switch(action.type) {
		case ACTION_SET_INCLUDE: return {
			...state,
			include: action.payload.labels || state.include
		};
		case ACTION_SET_EXCLUDE: return {
			...state,
			exclude: action.payload.labels || state.exclude
		};
		default: return state;
	}	
}

export const reducers = combineReducers({
	viewState: viewReducer,
	bookState: bookReducer,
	filterState: filterReducer
});