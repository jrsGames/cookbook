import React from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import './tourLine.css';
import { Stop } from '../../../resources/tours';
import { GlobalState } from '../../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setStopIndex } from '../../../redux/action_creators/TourState';
import { getStopIndex } from '../../../redux/selectors';

interface TourLineProps {
	stops: Stop[],
	selectStop: (index: number) => void,
	getStopIndex: () => number
}

class UnconnectedTourLine extends React.Component<TourLineProps, {}> {

	render() {
		return <div className="TourLine">
			{this.props.stops.map((stop, index) => {
				let formControlClassName = 'FormControlLabel';
				if (index === this.props.getStopIndex()) {
					formControlClassName = 'SelectedForm';
				}
				const radioButton = <RadioGroup
					key={index}
					aria-label="stop"
					value={this.props.getStopIndex()}
					onClick={() => this.props.selectStop(index)}
				>
					<FormControlLabel className={formControlClassName} value={index} control={<Radio color='primary' />} label={stop.name} />
				</RadioGroup>;
				if (stop.distanceToNext) {
					return <React.Fragment key={index}>
						{radioButton}
						<div className="distance"> {stop.distanceToNext}km </div>
					</React.Fragment>
				}
				return radioButton;
			})}
		</div>
	}	
}

const mapStateToProps = (state: GlobalState) => ({
	getStopIndex: () => getStopIndex(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	selectStop: (index: number) => dispatch(setStopIndex(index)),
});

export const TourLine = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTourLine);