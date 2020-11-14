import React from "react";
import { Stop } from "../../resources/tours";
import { TourLine } from "./TourLine/tourLine";
import { InfoBox } from "./InfoBox/infoBox";
import { GlobalState } from "../../redux/initialState";
import { connect } from "react-redux";
import { getStopIndex } from "../../redux/selectors";
import './stopsContent.css';
import { PicBox } from "./PicBox/picBox";

interface StopsContentProps {
	stops: Stop[],
	getStopIndex: () => number
}

interface StopsContentState {}

class UnconnectedStopsContent extends React.Component<StopsContentProps, StopsContentState> {
	
	render() {
		
		const currentStop: Stop = this.props.stops[this.props.getStopIndex()];
		
		return	<div className="StopsContent">
					<TourLine stops={this.props.stops}/>
					<div className="StopInfo">
						<PicBox pic={currentStop.pic} />
						<InfoBox
							stopName={currentStop.name}
							infoText={currentStop.infoText}
							inhabitants={currentStop.inhabitants}
						/>
					</div>
				</div>
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getStopIndex: () => getStopIndex(state)
});

export const StopsContent = connect(mapStateToProps)(UnconnectedStopsContent);