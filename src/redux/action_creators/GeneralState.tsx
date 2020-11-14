import { ACTION_SET_VIEW, ACTION_SET_PASSWORD } from "../actions";

export const setView = (view: string) => ({
	type: ACTION_SET_VIEW, payload: {view}
});

export const setPassword = (password: string) => ({
	type: ACTION_SET_PASSWORD, payload: {password}
});