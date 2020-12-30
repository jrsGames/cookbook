import { INGREDIENTS } from "../ingredients";

export const ENTRY_VIEW: string = 'entry';
export const READ_VIEW: string = 'read';
export const DEFAULT_FILE_NAME: string = 'kochbuch.json';

export interface ViewState {
	view: string,
	fileName: string
}

export const initialViewState: ViewState = {
	view: ENTRY_VIEW,
	fileName: DEFAULT_FILE_NAME
}

export interface Ingredient {
	amount: string,
	name: string
}

export interface Image {
	name: string,
	position: number
}

export interface Recipe {
	id?: string,
	name: string,
	duration?: number,
	labels: string[],
	ingredients: Ingredient[],
	preparation: string,
	notes?: string,
	image?: Image
}
export interface Cookbook {
	title: string,
	recipes: Recipe[]
}
export interface BookState {
	cookbook?: Cookbook | null,
	cookbookString?: string
}

export const initialBookState: BookState = {}

export interface FilterState {
	include: string[],
	exclude: string[]
}

export const initialFilterState: FilterState = {
	include: [],
	exclude: []
}

export interface IngredientState {
	ingredients: string[]
}

export const initialIngredientState: IngredientState = {
	ingredients: INGREDIENTS
}

export interface GlobalState {
	viewState: ViewState,
	bookState: BookState,
	filterState: FilterState,
	ingredientState: IngredientState
};

export const initialState: GlobalState = {
	viewState: initialViewState,
	bookState: initialBookState,
	filterState: initialFilterState,
	ingredientState: initialIngredientState
}
