import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton
} from '@material-ui/core';


interface SimpleDialogProps {
	open: boolean,
	onClose: () => void,
	title: string,
	subTitle: string,
	onConfirm: () => void
}

interface SimpleDialogState {
	open: boolean
}


export class SimpleDialog extends React.Component<SimpleDialogProps, SimpleDialogState> {
	
	constructor(props: SimpleDialogProps){
		super(props);
		this.state={
			open: props.open
		}
	}
	
	componentDidUpdate(oldProps: SimpleDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
	}
	

	render() {
		return (
			<Dialog open={this.state.open} onClose={() => this.props.onClose()}>
				<DialogTitle> {this.props.title} </DialogTitle>
				<DialogContent>
					<DialogContentText> {this.props.subTitle} </DialogContentText>
				</DialogContent>
				<DialogActions>
					<IconButton onClick={() => this.props.onConfirm()} color="primary"> Ja </IconButton>
					<IconButton onClick={() => this.props.onClose()} color="primary"> Nein </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}