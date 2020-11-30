import React from 'react';
import './photoDialog.css';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


interface PhotoDialogProps {
	open: boolean,
	closeDialog: () => void,
	setPhoto: (imageFileName: string) => void,
	imageName: string
}

interface PhotoDialogState {
	open: boolean
}


export class PhotoDialog extends React.Component<PhotoDialogProps, PhotoDialogState> {
	
	constructor(props: PhotoDialogProps){
		super(props);
		this.state={
			open: props.open
		}
	}
	
	componentDidUpdate(oldProps: PhotoDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
	}

	render() {
		return (
			<Dialog className="AddPhotoDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> {this.props.imageName} </DialogTitle>
				<DialogContent>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.props.setPhoto(this.props.imageName)} color="primary">
						<CheckIcon/>
					</IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}