export const ENTRY_VIEW: string = 'entry';
export const CREATE_VIEW: string = 'create';
export const READ_VIEW: string = 'read';

export interface GeneralState {
	password: string,
	view: string
}

export const initialGeneralState: GeneralState = {
	password: "12051970",
	view: ENTRY_VIEW
}

export interface TourState {
	stopIndex: number,
}

export const INITIAL_STOP_INDEX: number = 0;

export const initialTourState: TourState = {
	stopIndex: INITIAL_STOP_INDEX,
}

export interface GlobalState {
	generalState: GeneralState,
	tourState: TourState
};

export const initialState: GlobalState = {
	generalState: initialGeneralState,
	tourState: initialTourState
}
