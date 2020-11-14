import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import './timeContent.css';
import { Stop } from "../../resources/tours";
import { DataTable } from "./DataTable/dataTable";

interface TimeContentProps {
	stops: Stop[]
}

interface TimeContentState {
	selectedStart: string,
	selectedEnd: string,
}

export class TimeContent extends React.Component<TimeContentProps, TimeContentState> {
	
	constructor(props: TimeContentProps){
		super(props);
		this.state={
			selectedStart: this.props.stops[0].name,
			selectedEnd: this.props.stops[this.props.stops.length-1].name,
		};
	}
	
	setStart = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
		this.setState({
			...this.state,
			selectedStart: event.target.value
		});
	};
	
	setEnd = (event: any) => {
		this.setState({
			...this.state,
			selectedEnd: event.target.value
		});
	};
	
	render() {
		const names = [this.props.stops[0].name];
	
		for(let i=1; i < this.props.stops.length; i++){
			names.push(this.props.stops[i].name);
		};
		
		return	<div>
					<FormControl className='FormControl-From'>
						<InputLabel id="demo-simple-select-label">Von</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={this.state.selectedStart}
							onChange={this.setStart}
						>
							{names.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
						</Select>
					</FormControl>
					<FormControl className='FormControl-To'>
						<InputLabel id="demo-simple-select-label">Nach</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={this.state.selectedEnd}
							onChange={this.setEnd}
						>
							{names.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
						</Select>
					</FormControl>
					<DataTable stops={this.props.stops} start={this.state.selectedStart} end={this.state.selectedEnd}/>
				</div>
	}
}