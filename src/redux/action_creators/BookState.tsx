import { ACTION_SET_COOKBOOK, ACTION_SET_COOKBOOK_STRING } from "../actions";
import { Cookbook } from "../initialState";

export const setCookbook = (cookbook: Cookbook) => ({
	type: ACTION_SET_COOKBOOK, payload: {cookbook}
});
export const setCookbookString = (cookbookString: string) => ({
	type: ACTION_SET_COOKBOOK_STRING, payload: {cookbookString}
});