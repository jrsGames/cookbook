export const ENTRY_VIEW: string = 'entry';
export const CREATE_VIEW: string = 'create';
export const READ_VIEW: string = 'read';

export interface ViewState {
	view: string
}

export const initialViewState: ViewState = {
	view: ENTRY_VIEW
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
	cookbook?: Cookbook,
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

export interface GlobalState {
	viewState: ViewState,
	bookState: BookState,
	filterState: FilterState
};

export const initialState: GlobalState = {
	viewState: initialViewState,
	bookState: initialBookState,
	filterState: initialFilterState
}
