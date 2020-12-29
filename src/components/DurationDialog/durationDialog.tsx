import React from 'react';
import './durationDialog.css';
import { Recipe } from '../../redux/initialState';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


enum DurationEnum {
	DAYS = "days",
	HOURS = "hours",
	MINUTES = "minutes"
}

interface Duration {
	days: number,
	hours: number,
	minutes: number
}

interface DurationDialogProps {
	recipe: Recipe | null,
	setDuration: (duration: number) => void,
	open: boolean,
	closeDialog: () => void
}

interface DurationDialogState {
	currentDuration: Duration,
	open: boolean
}

export const parseDuration = (duration: number) => {
		const days = Math.floor(duration/1440);
		const hours = Math.floor((duration-1440*days)/60);
		const minutes = duration-1440*days-60*hours;
		return { days, hours, minutes }
}
	
const parseCurrentDuration = (currentDuration: Duration) =>
		currentDuration.days*1440 + currentDuration.hours*60 + currentDuration.minutes;

export class DurationDialog extends React.Component<DurationDialogProps, DurationDialogState> {
	
	constructor(props: DurationDialogProps){
		super(props);
		this.state={
			currentDuration: parseDuration(props.recipe?.duration || 0),
			open: props.open
		}
	}
	
	componentDidUpdate(oldProps: DurationDialogProps) {
		if(this.props.recipe && oldProps.recipe !== this.props.recipe) {
			this.setState({ currentDuration: parseDuration(this.props.recipe.duration || 0) });
		}
		if(oldProps.open !== this.props.open) {
			this.setState({open: this.props.open });
		}
	}
	
	updateCurrentDuration = (timeUnit: DurationEnum, value: string) => {
		const duration: Duration =  JSON.parse(JSON.stringify(this.state.currentDuration));
		duration[timeUnit] = Number(value);
		this.setState({ currentDuration: duration });
	}
	
	setDuration = () => {
		this.props.setDuration(parseCurrentDuration(this.state.currentDuration));
	}


	render() {
		
		const dialog = document.getElementById("SetDurationDialog");
		if(dialog) {
			dialog.addEventListener("keyup", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					this.setDuration();
				}
			});
		}
		
		return (
			<Dialog id="SetDurationDialog" className="SetDurationDialog" open={this.props.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Zubereitungszeit setzen </DialogTitle>
				<DialogContent>
					<FormControl className="SetDurationForm">
						<TextField
							className="DurationInput"
							label="Tage"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 1, min: 0, max: 30,
								placeholder: parseDuration(this.props.recipe?.duration || 0).days.toString()
							}}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.DAYS, event.target.value)}
						/>
						<TextField
							className="DurationInput"
							label="Stunden"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 1, min: 0, max: 23,
								placeholder: parseDuration(this.props.recipe?.duration || 0).hours.toString()
							}}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.HOURS, event.target.value)}
						/>
						<TextField
							className="DurationInput"
							label="Minuten"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 5, min: 0, max: 55,
								placeholder: parseDuration(this.props.recipe?.duration || 0).minutes.toString()
							}}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.MINUTES, event.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<IconButton className="ChecktDurationButton" onClick={() => this.setDuration()} color="primary" > <CheckIcon/> </IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}