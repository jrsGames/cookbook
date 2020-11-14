import React from 'react';
import {Card, CardContent, Typography, CardActionArea} from '@material-ui/core';
import { connect } from 'react-redux';
import { GlobalState, TOUR_BOARD, TOUR_DETAILS } from '../../redux/initialState';
import './tourBoard.css';
import { TOURS, Tour } from '../../resources/tours';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { setTour } from '../../redux/action_creators/TourState';
import { setView } from '../../redux/action_creators/GeneralState';

interface TourBoardProps {
	view: string,
	goToTour: (tour: Tour) => void
}

class UnconnectedTourBoard extends React.Component<TourBoardProps, {}> {

	getRootClassName = () => {
		if(this.props.view === TOUR_BOARD){
			return 'TourBoard-show';
		}
		return 'TourBoard-hide'
	}
	
	getTourCardStyle = (pic: string) => ({
		background: `url('http://awesomegames.bplaced.net/pics/${pic}') no-repeat center`,
		backgroundSize: 'cover'
	});
	
	render(){
		return (
			<div className={this.getRootClassName()}>
				{TOURS.map((tour) => (
					<Card className="TourCard" key={tour.name} style={this.getTourCardStyle(tour.pic)}>
						<CardActionArea className="ActionArea" onClick={() => this.props.goToTour(tour)}>
							<CardContent>
								<Typography className="Typography" gutterBottom variant="h5" component="h2">
								{tour.name}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goToTour: (tour: Tour) => {
		if(tour.stops.length > 0) {
			dispatch(setTour(tour));
			dispatch(setView(TOUR_DETAILS));
		}
	}
})

export const TourBoard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTourBoard);