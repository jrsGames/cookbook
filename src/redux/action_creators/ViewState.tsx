import { ACTION_SET_VIEW } from "../actions";

export const setView = (view: string) => ({
	type: ACTION_SET_VIEW, payload: {view}
});