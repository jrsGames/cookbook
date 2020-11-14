import { Tour } from "../resources/tours";

export interface Action<T> {
	type: string;
	payload: T;
}

/* GENERALSTATE */
export const ACTION_SET_PASSWORD = "setPassword";
export interface ActionSetPassword {
	password: string
}
export const ACTION_SET_VIEW = "setView";
export interface ActionSetView {
	view: string
}

/* TOURSTATE */
export const ACTION_SET_STOP_INDEX = "setStopIndex";
export interface ActionSetStopIndex {
	stopIndex: number
}
export const ACTION_SET_TOUR = "setTour";
export interface ActionSetTour {
	tour: Tour
}

export interface ActionSetGeneralState extends ActionSetView, ActionSetPassword {};
export interface ActionSetTourState extends ActionSetStopIndex, ActionSetTour {};