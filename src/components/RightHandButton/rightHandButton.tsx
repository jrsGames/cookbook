import React from 'react';
import { IconButton, Tooltip, Zoom } from '@material-ui/core';
import './rightHandButton.css';

interface RightHandButtonProps {
	title: string
	onClick: () => void,
	icon: React.ReactNode,
	active?: boolean
}

export class RightHandButton extends React.Component<RightHandButtonProps> {

	render() {
		return (
			<Tooltip title={this.props.title} TransitionComponent={Zoom} placement="bottom">
				<IconButton
					className={this.props.active ? "ActiveButton" : "InactiveButton"}
					color="inherit"
					onClick={() => this.props.onClick()}
				>
					{this.props.icon}
				</IconButton>
			</Tooltip>
		);
	}
}