import React from "react";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TimerIcon from '@material-ui/icons/Timer';
import SpeedIcon from '@material-ui/icons/Speed';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Table, TableBody, TableRow, TableCell, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Stop } from "../../../resources/tours";

interface DataTableProps {
	stops: Stop[],
	start: string,
	end: string
}

interface DataTableState {
	speed: number
}

export class DataTable extends React.Component<DataTableProps, DataTableState> {
	
	constructor(props: DataTableProps) {
		super(props);
		this.state={
			speed: 20
		};
	}
	
	setSpeed = (e: any) => {
		console.log(e.target.value);
		this.setState({
			...this.state,
			speed: e.target.value
		})
	}
		
	render() {
		
		const names = [this.props.stops[0].name];
		const distances = [0, this.props.stops[0].distanceToNext];

		for(let i=1; i < this.props.stops.length; i++){
			names.push(this.props.stops[i].name);
			distances.push(this.props.stops[i].distanceToNext);
		};
		
		for(let i=1; i < distances.length; i++){
			distances[i] = distances[i-1] + distances[i];
		};
		
		distances.pop();
				
		const getDistance = (start: string, end: string) => {
			const startIndex = names.indexOf(start);
			const endIndex = names.indexOf(end);
			const distance = distances[endIndex] - distances[startIndex];
			if(distance >= 0){
				return distance;
			} else return -distance;
		}
		
		const distance = getDistance(this.props.start, this.props.end)
		
		const getHeightDifference = (start: string, end: string) => {
			const startIndex = names.indexOf(start);
			const endIndex = names.indexOf(end);
			return this.props.stops[endIndex].height - this.props.stops[startIndex].height
		}
		
		const getTime = () => {
			const time = distance/this.state.speed;
			if(time === Infinity || time <= 0) {
				return 'Eingaben ungueltig!'
			};
			const hours = Math.floor(time);
			const minutes = Math.round((time-hours)*60);
			return `${hours} Std. ${minutes} Min.`;
		}
		
		return	<Table className="Table" aria-label="simple table">
					<TableBody>
						<TableRow key="speed">
							<TableCell component="th" scope="row">	<SpeedIcon style={{ color: green[500] }}/>	</TableCell>
							<TableCell align="right">
								<TextField id="standard-basic" type="number" value={this.state.speed} label="km/h" onChange={(e: any) => this.setSpeed(e)}/>
							</TableCell>
						</TableRow>
						<TableRow key="distance">
							<TableCell component="th" scope="row">	<ArrowRightAltIcon style={{ color: green[500] }}/>	</TableCell>
							<TableCell align="right"> {distance} km </TableCell>
						</TableRow>
						<TableRow key="height">
							<TableCell component="th" scope="row">	<TrendingUpIcon style={{ color: green[500] }}/>	</TableCell>
							<TableCell align="right"> {getHeightDifference(this.props.start, this.props.end)} m </TableCell>
						</TableRow>
						<TableRow key="time">
							<TableCell component="th" scope="row">	<TimerIcon style={{ color: green[500] }}/>	</TableCell>
							<TableCell align="right"> {getTime()} </TableCell>
						</TableRow>
					</TableBody>
				</Table>;
	}
}