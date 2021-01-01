import React from 'react';
import './portionsDialog.css';
import { Recipe } from '../../redux/initialState';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	Tooltip,
	Zoom
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


interface PortionsDialogProps {
	recipe: Recipe | null,
	setPortions: (amount: number) => void,
	open: boolean,
	closeDialog: () => void
}

interface PortionsDialogState {
	currentPortions: number,
	open: boolean
}

export class PortionsDialog extends React.Component<PortionsDialogProps, PortionsDialogState> {
	
	constructor(props: PortionsDialogProps){
		super(props);
		this.state={
			currentPortions: props.recipe?.portions || 0,
			open: props.open
		}
	}
	
	componentDidUpdate(oldProps: PortionsDialogProps) {
		if(this.props.recipe && oldProps.recipe !== this.props.recipe) {
			this.setState({ currentPortions: this.props.recipe.portions || 0 });
		}
		if(oldProps.open !== this.props.open) {
			this.setState({open: this.props.open });
		}
	}
	
	updateCurrentPortions = (portions: string) => {
		this.setState({ currentPortions: parseInt(portions) });
	}
	
	setPortions = () => {
		this.props.setPortions(this.state.currentPortions);
	}


	render() {
				
		const dialog = document.getElementById("SetPortionsDialog");
		if(dialog) {
			dialog.addEventListener("keyup", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					this.setPortions();
				}
			});
		}
		
		return (
			<Dialog id="SetPortionsDialog" className="SetPortionsDialog" open={this.props.open} onClose={() => this.props.closeDialog()}>
				<DialogTitle> Anzahl Portionen setzen </DialogTitle>
				<DialogContent>
					<FormControl className="SetPortionsForm">
						<TextField
							className="PortionsInput"
							label="Portionen"
							type="number"
							autoFocus
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 1, min: 1, max: 99,
								placeholder: (this.props.recipe?.portions || 1).toString()
							}}
							onChange={(event) => this.updateCurrentPortions(event.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Tooltip title="Speichern und schliessen (ENTER)" TransitionComponent={Zoom} placement="bottom">
						<IconButton className="CheckPortionsButton" onClick={() => this.setPortions()} color="primary" >
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