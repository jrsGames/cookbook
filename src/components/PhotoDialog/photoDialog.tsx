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
import { Image } from '../../redux/initialState';
import { DEFAULT_PIC_NAME } from '../RecipeCard/recipeCard';


interface PhotoDialogProps {
	open: boolean,
	closeDialog: () => void,
	setPhoto: (image: Image) => void,
	imageName: string
}

interface PhotoDialogState {
	open: boolean,
	scrollPosition: number
}


export class PhotoDialog extends React.Component<PhotoDialogProps, PhotoDialogState> {
	
	constructor(props: PhotoDialogProps){
		super(props);
		this.state={
			open: props.open,
			scrollPosition: 0
		}
	}
	
	componentDidUpdate(oldProps: PhotoDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open, scrollPosition: 0 });
		}
	}
	
	getImageSource = () => {
		const imageName = this.props.imageName;
		if(imageName) {
			try {
				return require('../../images/' + imageName);
			} catch (e) {
				console.log("Picture \"" + imageName + "\" not found.");
			}
		}
		return null;
	}
	
	setScrollPosition = () => {
		const container = document.getElementById("ImagePreviewContainer");
		const image = document.getElementById("ImagePreview");
		if(container && image) {
			this.setState({ scrollPosition: container.scrollTop/100 });
		}
	}
	
	setPhoto = () => {
		const image: Image = {
			name: this.getImageSource() ? this.props.imageName : DEFAULT_PIC_NAME,
			position: this.state.scrollPosition
		};
		this.props.setPhoto(image);
	}

	render() {
		return (
			<Dialog className="AddPhotoDialog" open={this.state.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> {this.props.imageName} </DialogTitle>
				<DialogContent id="ImagePreviewContainer" className="ImagePreviewContainer" onScroll={() => this.setScrollPosition()}>
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
						onClick={() => this.setPhoto()}
					>
						<CheckIcon/>
					</IconButton>
					<IconButton onClick={() => this.props.closeDialog()} color="primary"> <ClearIcon/> </IconButton>
				</DialogActions>
			</Dialog>
		);
	}
}