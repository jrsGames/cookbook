import React from 'react';
import './titleDialog.css';
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


interface TitleDialogProps {
	open: boolean,
	closeDialog: () => void,
	oldTitle: string,
	setTitle: (title: string) => void,
}

interface TitleDialogState {
	open: boolean,
	title: string
}


export class TitleDialog extends React.Component<TitleDialogProps, TitleDialogState> {
	
	constructor(props: TitleDialogProps){
		super(props);
		this.state={
			open: props.open,
			title: props.oldTitle
		}
	}
	
	componentDidUpdate(oldProps: TitleDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
		if(oldProps.oldTitle !== this.props.oldTitle) {
			this.setState({ title: this.props.oldTitle });
		}
	}
	
	setNewTitle = (title: string | null) => {
		if(title) {
			this.setState({ title });
		}
	}
	
	setTitleAndClose = () => {
		if(this.state.open) {
			this.props.setTitle(this.state.title);
		}
		this.props.closeDialog();
	}

	render() {
		const dialog = document.getElementById("SetTitleDialog");
		if(dialog) {
			dialog.addEventListener("keyup", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					this.setTitleAndClose();
				}
			});
		}
		
		return (
			<Dialog id="SetTitleDialog" className="SetTitleDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Neuer Titel </DialogTitle>
				<DialogContent className="AddTitleDialogContent">
					<FormControl>
						<TextField
							autoFocus
							variant="outlined"
							defaultValue={this.props.oldTitle}
							onChange={(event) => this.setNewTitle(event.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.setTitleAndClose()} color="primary"> <CheckIcon/> </IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}