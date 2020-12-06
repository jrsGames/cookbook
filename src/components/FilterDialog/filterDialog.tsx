import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './filterDialog.css';
import { Cookbook, GlobalState } from '../../redux/initialState';
import { getCookbook, getIncludedLabels, getExcludedLabels } from '../../redux/selectors';
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
import { setIncludedLabels, setExcludedLabels } from '../../redux/action_creators/FilterState';


interface FilterDialogProps {
	open: boolean,
	closeDialog: () => void,
	getIncludedLabels: () => string[],
	getExcludedLabels: () => string[],
	setFilteredLabels: (included: string[], excluded: string[]) => void,
	getCookbook: () => Cookbook
}

interface FilterDialogState {
	open: boolean,
	included: string[],
	excluded: string[],
	defaultIncl: string[],
	defaultExcl: string[]
}


export class UnconnectedFilterDialog extends React.Component<FilterDialogProps, FilterDialogState> {
	
	constructor(props: FilterDialogProps){
		super(props);
		this.state={
			open: props.open,
			included: props.getIncludedLabels(),
			excluded: props.getExcludedLabels(),
			defaultIncl: [],
			defaultExcl: []
		}
	}
	
	componentDidUpdate(oldProps: FilterDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
			if(this.props.open) {
				this.setState({ defaultIncl: this.props.getIncludedLabels(), defaultExcl: this.props.getExcludedLabels() })
			}
		}
	}
	
	setFilter = () => {
		this.props.setFilteredLabels(this.state.included, this.state.excluded);
		this.props.closeDialog();
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
	
	setIncludeFilter = (value: string[] | unknown) => {
		if(Array.isArray(value)) {
			this.setState({ included: value });
		}
	}

	setExcludeFilter = (value: string[] | unknown) => {
		if(Array.isArray(value)) {
			this.setState({ excluded: value });
		}
	}
	
	
	render() {
		return (
			<Dialog className="SetFilterDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Nach Labels filtern </DialogTitle>
				<div className="Include"> Muss enthalten </div>
				<DialogContent className="AddFilterDialogContent">
						<FormControl>
							<Select
								className="Select"
								multiple
								defaultValue={this.state.defaultIncl}
								onChange={(event) => this.setIncludeFilter(event.target.value)}
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
				<div className="Exclude"> Darf nicht enthalten </div>
				<DialogContent className="AddFilterDialogContent">
						<FormControl>
							<Select
								className="Select"
								multiple
								defaultValue={this.state.defaultExcl}
								onChange={(event) => this.setExcludeFilter(event.target.value)}
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
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK,
	getIncludedLabels: () => getIncludedLabels(state),
	getExcludedLabels: () => getExcludedLabels(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setFilteredLabels: (included: string[], excluded: string[]) => {
		dispatch(setIncludedLabels(included));
		dispatch(setExcludedLabels(excluded));
	}
});

export const FilterDialog = connect(mapStateToProps, mapDispatchToProps)(UnconnectedFilterDialog);