import React from 'react';
import './filterDialog.css';
import {
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Select,
	FormControl,
	InputLabel
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


interface FilterDialogProps {
	open: boolean,
	closeDialog: () => void,
	oldIncluded: string[],
	oldExcluded: string[],
	setFilteredLabels: (included: string[], excluded: string[]) => void,
}

interface FilterDialogState {
	open: boolean,
	included: string[],
	excluded: string[]
}


export class FilterDialog extends React.Component<FilterDialogProps, FilterDialogState> {
	
	constructor(props: FilterDialogProps){
		super(props);
		this.state={
			open: props.open,
			included: props.oldIncluded,
			excluded: props.oldExcluded
		}
	}
	
	componentDidUpdate(oldProps: FilterDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
		if(oldProps.oldIncluded !== this.props.oldIncluded) {
			this.setState({ included: this.props.oldIncluded });
		}
		if(oldProps.oldExcluded !== this.props.oldExcluded) {
			this.setState({ excluded: this.props.oldExcluded });
		}
	}
	
	setFilter = () => {
		this.props.setFilteredLabels(this.state.included, this.state.excluded);
	}
	
	deleteLabel = (index: number) => {
		const newIncluded: string[] = JSON.parse(JSON.stringify(this.state.included));
		newIncluded.splice(index, 1);
		this.setState({ included: newIncluded})
	}

	render() {
		const names = ["Name1", "Name2"]
		const included: string[] = JSON.parse(JSON.stringify(this.state.included));
		const excluded: string[] = JSON.parse(JSON.stringify(this.state.excluded));
		
		return (
			<Dialog className="SetFilterDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Nach Labels filtern </DialogTitle>
				<DialogContent className="AddFilterDialogContent">
					<div>
						<FormControl>
							<InputLabel>Muss enthalten</InputLabel>
							<Select
								multiple
								defaultValue={included}
								renderValue={(selected) => (
									<div>
										{(selected as string[]).map((value) => (
											<Chip key={value} label={value} color="primary" />
										))}
									</div>
								)}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}> {name} </MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.setFilter()} color="primary"> <CheckIcon/> </IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}