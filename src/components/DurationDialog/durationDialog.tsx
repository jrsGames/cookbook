import React from 'react';
import './durationDialog.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
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


interface Duration {
	days: number,
	hours: number,
	minutes: number
}

enum DurationEnum {
	DAYS = "days",
	HOURS = "hours",
	MINUTES = "minutes"
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

class UnconnectedDurationDialog extends React.Component<DurationDialogProps, DurationDialogState> {
	
	constructor(props: DurationDialogProps){
		super(props);
		this.state={
			currentDuration: this.parseDuration(0),
			open: props.open
		}
	}
	
	componentDidUpdate(oldProps: DurationDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({open: this.props.open });
		}
	}

	parseDuration = (duration: number) => {
		const days = Math.floor(duration/1440);
		const hours = Math.floor((duration-1440*days)/60);
		const minutes = duration-1440*days-60*hours;
		return { days, hours, minutes }
	}
	
	parseCurrentDuration = (currentDuration: Duration) =>
		currentDuration.days*1440 + currentDuration.hours*60 + currentDuration.minutes;
	
	updateCurrentDuration = (timeUnit: DurationEnum, value: string) => {
		const duration: Duration =  JSON.parse(JSON.stringify(this.state.currentDuration));
		duration[timeUnit] = Number(value);
		this.setState({ currentDuration: duration });
	}
	
	getDurationLabel = () => {
		const {days, hours, minutes} = this.parseDuration(this.props.recipe?.duration || 0);
		const daysLabel = days.toString() + " T ";
		const hoursLabel = hours.toString() + " Std ";
		const minutesLabel = minutes.toString() + " Min";
		if(days) {
			return daysLabel + hoursLabel + minutesLabel;
		}
		if(hours) {
			return hoursLabel + minutesLabel;
		}
		if(minutes) {
			return minutesLabel;
		}
		return "Dauer angeben";
	}
	

	render() {
		return (
			<Dialog className="SetDurationDialog" open={this.props.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Zubereitungszeit setzen </DialogTitle>
				<DialogContent>
					<FormControl className="SetDurationForm">
						<TextField
							className="DurationInput"
							label="Tage"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 1, min: 0, max: 30,
								placeholder: this.parseDuration(this.props.recipe?.duration || 0).days.toString()
							}}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.DAYS, event.target.value)}
						/>
						<TextField
							className="DurationInput"
							label="Stunden"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 1, min: 0, max: 23,
								placeholder: this.parseDuration(this.props.recipe?.duration || 0).hours.toString() }}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.HOURS, event.target.value)}
						/>
						<TextField
							className="DurationInput"
							label="Minuten"
							type="number"
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 5, min: 0, max: 55,
								placeholder: this.parseDuration(this.props.recipe?.duration || 0).minutes.toString() }}
							onChange={(event) => this.updateCurrentDuration(DurationEnum.MINUTES, event.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<IconButton
						onClick={() => this.props.setDuration(this.parseCurrentDuration(this.state.currentDuration))}
						color="primary"
					>
						<CheckIcon/>
					</IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const DurationDialog = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDurationDialog);