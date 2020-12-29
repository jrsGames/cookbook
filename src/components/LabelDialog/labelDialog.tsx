import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GlobalState, Cookbook, Recipe } from '../../redux/initialState';
import { getCookbook } from '../../redux/selectors';
import './labelDialog.css';
import { LABELS } from '../../labels';
import { START_COOKBOOK } from '../EntryPage/entryPage';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, TextField, Tooltip, Zoom} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';


interface LabelDialogProps {
	open: boolean,
	closeDialog: () => void,
	addLabel: (label: string) => void,
	getUsedLabels: () => string[]
}

interface LabelDialogState {
	open: boolean,
	label: string
}


class UnconnectedLabelDialog extends React.Component<LabelDialogProps, LabelDialogState> {
	
	constructor(props: LabelDialogProps){
		super(props);
		this.state={
			open: props.open,
			label: ""
		}
	}
	
	componentDidUpdate(oldProps: LabelDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
	}
	
	setNewLabel = (label: string | null) => {
		if(label) {
			this.setState({ label });
		}
	}
	
	getLabelOptions = () => {
		const options: string[] = LABELS.concat(this.props.getUsedLabels());
		return options.filter((item, pos) => options.indexOf(item) === pos).sort();
	}
	
	addLabelAndClose = () => {
		if(this.state.open) {
			this.props.addLabel(this.state.label);
		}
		this.props.closeDialog();
	}
	
	render() {
		const dialog = document.getElementById("AddLabelDialog");
		if(dialog) {
			dialog.addEventListener("keyup", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					this.addLabelAndClose();
				}
			});
		}
		
		return (
			<Dialog id="AddLabelDialog" className="AddLabelDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Neues Label </DialogTitle>
				<DialogContent>
					<FormControl className="AddLabelForm">
							<Autocomplete
								freeSolo
								options={this.getLabelOptions()}
								onChange={(_event, value) => this.setNewLabel(value)}
								renderInput={(params) => (
									<TextField
										{...params}
										autoFocus
										variant="outlined"
										onChange={(event) => this.setNewLabel(event.target.value)}
										InputProps={{ ...params.InputProps, type: 'search' }}
									/>
								)}
							/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Tooltip title="Speichern (ENTER)" TransitionComponent={Zoom} placement="bottom">
						<IconButton className="ChecktLabelButton" onClick={() => this.addLabelAndClose()} color="primary">
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
	getUsedLabels: () => {
		const cookbook: Cookbook = getCookbook(state) || START_COOKBOOK;
		let usedLabels: string[] = [];
		cookbook.recipes.forEach((recipe: Recipe) => {
			usedLabels = usedLabels.concat(recipe.labels);
		});
		return usedLabels.filter((item, pos) => usedLabels.indexOf(item) === pos);
	}
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const LabelDialog = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLabelDialog);