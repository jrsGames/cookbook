import { Tour, TOURS } from "../resources/tours";

export const LOGIN: string = 'login';
export const TOUR_BOARD: string = 'tourBoard';
export const TOUR_DETAILS: string = 'tourDetails';

export interface GeneralState {
	password: string,
	view: string
}

export const initialGeneralState: GeneralState = {
	password: "12051970",
	view: LOGIN
}

export interface TourState {
	stopIndex: number,
	tour: Tour
}

export const INITIAL_STOP_INDEX: number = 0;

export const initialTourState: TourState = {
	stopIndex: INITIAL_STOP_INDEX,
	tour: TOURS[0]
}

export interface GlobalState {
	generalState: GeneralState,
	tourState: TourState
};

export const initialState: GlobalState = {
	generalState: initialGeneralState,
	tourState: initialTourState
}
