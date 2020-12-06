import { ACTION_SET_INCLUDE, ACTION_SET_EXCLUDE } from "../actions";

export const setInludedLabels = (labels: string[]) => ({
	type: ACTION_SET_INCLUDE, payload: {labels}
});

export const setExludedLabels = (labels: string[]) => ({
	type: ACTION_SET_EXCLUDE, payload: {labels}
});