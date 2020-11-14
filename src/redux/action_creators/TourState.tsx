import { ACTION_SET_STOP_INDEX } from "../actions";

export const setStopIndex = (stopIndex: number) => ({
	type: ACTION_SET_STOP_INDEX, payload: {stopIndex}
});