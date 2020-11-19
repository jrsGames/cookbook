import { Cookbook } from "./initialState";

export interface Action<T> {
	type: string;
	payload: T;
}

/* GENERALSTATE */
export const ACTION_SET_VIEW = "setView";
export interface ActionSetView {
	view: string
}

/* BOOKSTATE */
export const ACTION_SET_COOKBOOK = "setCookbook";
export interface ActionSetCookbook {
	cookbook: Cookbook
}
export const ACTION_SET_COOKBOOK_STRING = "setCookbookString";
export interface ActionSetCookbookString {
	cookbookString: string
}

export interface ActionSetGeneralState extends ActionSetView {};
export interface ActionSetBookState extends ActionSetCookbook, ActionSetCookbookString {};