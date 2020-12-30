import { ACTION_SET_VIEW, ACTION_SET_FILE_NAME } from "../actions";

export const setView = (view: string) => ({
	type: ACTION_SET_VIEW, payload: {view}
});

export const setFileName = (fileName: string) => ({
	type: ACTION_SET_FILE_NAME, payload: {fileName}
});