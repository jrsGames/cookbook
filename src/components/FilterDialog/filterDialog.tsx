import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './filterDialog.css';
import { Cookbook, GlobalState } from '../../redux/initialState';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import {
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Select,
	FormControl
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


interface FilterDialogProps {
	open: boolean,
	closeDialog: () => void,
	oldIncluded: string[],
	oldExcluded: string[],
	setFilteredLabels: (included: string[], excluded: string[]) => void,
	getCookbook: () => Cookbook
}

interface FilterDialogState {
	open: boolean,
	included: string[],
	excluded: string[]
}


export class UnconnectedFilterDialog extends React.Component<FilterDialogProps, FilterDialogState> {
	
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
	
	getLabels: () => string[] = () => {
		let labels: string[] = [];
		this.props.getCookbook().recipes.forEach((recipe) => {
			labels = labels.concat(recipe.labels);
		})
		return labels.filter((item, pos) => labels.indexOf(item) === pos).sort();
	}
	
	menuProps = {
		PaperProps: {
			style: {
				minWidth: 250,
				width: 250,
			},
		},
	}

	render() {
		const included: string[] = JSON.parse(JSON.stringify(this.state.included));
		const excluded: string[] = JSON.parse(JSON.stringify(this.state.excluded));
		
		return (
			<Dialog className="SetFilterDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Nach Labels filtern </DialogTitle>
				<div className="Include"> Muss enthalten </div>
				<DialogContent className="AddFilterDialogContent">
						<FormControl>
							<Select
								className="Select"
								multiple
								defaultValue={included}
								renderValue={(selected) => (
									<div>
										{(selected as string[]).map((value) => (
											<Chip className="Label" key={value} label={value} color="primary" />
										))}
									</div>
								)}
								MenuProps={this.menuProps}
							>
								{this.getLabels().map((label) => (
									<MenuItem key={label} value={label}> {label} </MenuItem>
								))}
							</Select>
						</FormControl>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.setFilter()} color="primary"> <CheckIcon/> </IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const FilterDialog = connect(mapStateToProps, mapDispatchToProps)(UnconnectedFilterDialog);