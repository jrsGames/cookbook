export const ENTRY_VIEW: string = 'entry';
export const CREATE_VIEW: string = 'create';
export const READ_VIEW: string = 'read';

export interface GeneralState {
	view: string
}

export const initialGeneralState: GeneralState = {
	view: ENTRY_VIEW
}

export interface Ingredient {
	amount: string,
	name: string
}

export interface Image {
	name: string,
	position: string
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

export interface GlobalState {
	generalState: GeneralState,
	bookState: BookState
};

export const initialState: GlobalState = {
	generalState: initialGeneralState,
	bookState: initialBookState
}
