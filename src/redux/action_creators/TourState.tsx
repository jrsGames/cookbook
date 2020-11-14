import { ACTION_SET_STOP_INDEX, ACTION_SET_TOUR } from "../actions";
import { Tour } from "../../resources/tours";

export const setStopIndex = (stopIndex: number) => ({
	type: ACTION_SET_STOP_INDEX, payload: {stopIndex}
});

export const setTour = (tour: Tour) => ({
	type: ACTION_SET_TOUR, payload: {tour}
})