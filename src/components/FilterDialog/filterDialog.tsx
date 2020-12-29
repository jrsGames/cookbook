import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './filterDialog.css';
import { Cookbook, GlobalState } from '../../redux/initialState';
import { getCookbook, getIncludedLabels, getExcludedLabels, getCookbookString } from '../../redux/selectors';
import { setIncludedLabels, setExcludedLabels } from '../../redux/action_creators/FilterState';
import { START_COOKBOOK } from '../EntryPage/entryPage';
import {Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, FormControl, Tooltip, Zoom} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { parseToCookbook } from '../UploadInput/uploadInput';


interface FilterDialogProps {
	open: boolean,
	closeDialog: () => void,
	getIncludedLabels: () => string[],
	getExcludedLabels: () => string[],
	setFilteredLabels: (included: string[], excluded: string[]) => void,
	getCookbook: () => Cookbook,
	getCookbookString: () => string
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
	
	setFilterAndClose = () => {
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
		});
		if(this.props.getCookbookString()) {
			const originalCookbook: Cookbook = parseToCookbook(this.props.getCookbookString());
			originalCookbook.recipes.forEach((recipe) => {
				labels = labels.concat(recipe.labels);
			});
		}
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

		const dialog = document.getElementById("SetFilterDialog");
		if(dialog) {
			dialog.addEventListener("keyup", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					this.setFilterAndClose();
				}
			});
		}
		
		return (
			<Dialog id="SetFilterDialog" className="SetFilterDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
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
											<Chip className="Label" key={value} label={value} />
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
											<Chip className="Label" key={value} label={value} />
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
					<Tooltip title="Speichern und schliessen (ENTER)" TransitionComponent={Zoom} placement="bottom">
						<IconButton className="ChecktFilterButton" onClick={() => this.setFilterAndClose()} color="primary">
							<CheckIcon/>
						</IconButton>
					</Tooltip>
					<Tooltip title="Schliessen (ESC)" TransitionComponent={Zoom} placement="bottom">
						<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
					</Tooltip>
				</DialogActions>
			</Dialog>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || START_COOKBOOK,
	getCookbookString: () => getCookbookString(state),
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