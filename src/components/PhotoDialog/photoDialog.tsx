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
import { DEFAULT_PIC_NAME } from '../RecipeCard/recipeCard';


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
	
	getImageSource = () => {
		const image = this.props.imageName;
		if(image) {
			try {
				return require('../../resources/' + image);
			} catch (e) {
				console.log("Picture \"" + image + "\" not found.");
			}
		}
		return null;
	}
	
	getScrollPosition = () => {
		const container = document.getElementById("ImagePreviewContainer");
		const image = document.getElementById("ImagePreview");
		if(container && image) {
			return (image as HTMLImageElement).height * container.scrollTop/100;
		}
		return 0;
	}

	render() {
		return (
			<Dialog className="AddPhotoDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> {this.props.imageName} </DialogTitle>
				<DialogContent id="ImagePreviewContainer" className="ImagePreviewContainer" onScroll={() => this.getScrollPosition()}>
					{this.getImageSource() ?
					<img
						id="ImagePreview"
						className="ImagePreview"
						src={this.getImageSource()}
						alt="Bild nicht gefunden. Standard-Bild verwenden?"
					/> :
					<div> Bild nicht gefunden. Standard-Bild verwenden? </div>
					} 	
				</DialogContent>
				<DialogActions>
					<IconButton
						color="primary"
						onClick={() => this.props.setPhoto(this.getImageSource() ? this.props.imageName : DEFAULT_PIC_NAME)}
					>
						<CheckIcon/>
					</IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}