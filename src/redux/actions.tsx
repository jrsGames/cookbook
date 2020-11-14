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

export interface ActionSetGeneralState extends ActionSetView, ActionSetPassword {};