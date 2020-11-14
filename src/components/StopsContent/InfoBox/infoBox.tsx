import React from "react";
import './infoBox.css';
import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";

export const InfoBox = (props: {stopName: string, inhabitants: string, infoText: string}) => {
	return	<div className="InfoBox">
				<Card className="InfoCard">
					<CardHeader
						avatar={ <Avatar className="InfoSign"> i </Avatar> }
						title={props.stopName}
						subheader={`${props.inhabitants} Einwohner`}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{props.infoText}
						</Typography>
					</CardContent>
				</Card>
			</div>
}