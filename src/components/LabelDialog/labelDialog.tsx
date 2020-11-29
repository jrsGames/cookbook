import React from 'react';
import './labelDialog.css';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { LABELS } from '../../labels';


interface LabelDialogProps {
	open: boolean,
	closeDialog: () => void,
	addLabel: (label: string) => void,
}

interface LabelDialogState {
	open: boolean,
	label: string
}


export class LabelDialog extends React.Component<LabelDialogProps, LabelDialogState> {
	
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

	render() {
		return (
			<Dialog className="AddLabelDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Neues Label </DialogTitle>
				<DialogContent>
					<FormControl className="AddLabelForm">
							<Autocomplete
								freeSolo
								options={LABELS}
								onChange={(_event, value) => this.setNewLabel(value)}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="outlined"
										onChange={(event) => this.setNewLabel(event.target.value)}
										InputProps={{ ...params.InputProps, type: 'search' }}
									/>
								)}
							/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.props.addLabel(this.state.label)} color="primary"> <CheckIcon/> </IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}