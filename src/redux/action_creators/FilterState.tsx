import { ACTION_SET_INCLUDE, ACTION_SET_EXCLUDE } from "../actions";

export const setIncludedLabels = (labels: string[]) => ({
	type: ACTION_SET_INCLUDE, payload: {labels}
});

export const setExcludedLabels = (labels: string[]) => ({
	type: ACTION_SET_EXCLUDE, payload: {labels}
});