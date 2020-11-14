import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { TabPanel } from '../TabPanel/tabPanel';
import './tabBar.css';
import { connect } from 'react-redux';
import { GlobalState, INITIAL_STOP_INDEX, TOUR_BOARD, TOUR_DETAILS } from '../../redux/initialState';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { Dispatch } from 'redux';
import { setStopIndex } from '../../redux/action_creators/TourState';
import { getView } from '../../redux/selectors';
import { setView } from '../../redux/action_creators/GeneralState';

function generalTabProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

interface TabBarProps {
	view: string,
	goToTourBoard: () => void,
	resetStopIndex: () => void
}

interface TabBarState {
	tabIndex: number,
}

const ROUTE = 'Route';
const HOEHENPROFIL = 'Hoehenprofil';
const KARTE = 'Karte';
const FAHRTZEIT = 'Fahrtzeit';

const TAB_NAMES: string[] = [ROUTE, HOEHENPROFIL, KARTE, FAHRTZEIT];

const INITIAL_TAB_INDEX = 2;

class UnconnectedTabBar extends React.Component<TabBarProps, TabBarState> {

	constructor(props: TabBarProps) {
		super(props);
		this.state = {
			tabIndex: INITIAL_TAB_INDEX
		}
	}

	updateTabIndex = (newTabIndex: number) => {
		this.setState({
			...this.state,
			tabIndex: newTabIndex
		});
	};
	
	resetTabIndex = () => this.updateTabIndex(INITIAL_TAB_INDEX);
	
	getRootClassName = () => {
		if(this.props.view === TOUR_DETAILS){
			return 'TabBar-show';
		}
		return 'TabBar-hide'
	}
	
	scrollUpTourLine = () => {
		const tourLineArray = document.getElementsByClassName('TourLine');
		if(tourLineArray && tourLineArray[0] && tourLineArray[0].scrollTop) {
			tourLineArray[0].scrollTop = 0;
		}
	}
	
	goBack = () => {
		this.props.goToTourBoard();
		this.scrollUpTourLine();
		this.resetTabIndex();
		this.props.resetStopIndex();
	}
	
	render(){			
		return (
			<div className={this.getRootClassName()}>
				<AppBar position="static" color="default" className='tabBar'>
					<Tabs
						value={this.state.tabIndex}
						onChange={(_event: React.ChangeEvent<{}>, index: number) => this.updateTabIndex(index)}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs"
					>
						<Tab key='back' className="BackTab" icon={<KeyboardBackspace />} {...generalTabProps(0)} onClick={() => this.goBack()}/>
						<Tab key={'tourName'} className="LabelTab" label={"1"} disabled {...generalTabProps(1)} />
						{TAB_NAMES.map((tabName, index) => {
							return <Tab key={index+2} label={tabName} {...generalTabProps(index+2)} />
						})}
					</Tabs>
				</AppBar>
				{TAB_NAMES.map((tabName, index) => {
					let content = <div />;
					switch(tabName) {
						default: break;
					}
					return	<TabPanel key={index+2} value={this.state.tabIndex} index={index+2}> {content} </TabPanel>; 
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	resetStopIndex: () => dispatch(setStopIndex(INITIAL_STOP_INDEX)),
	goToTourBoard: () => dispatch(setView(TOUR_BOARD)),
})

export const TabBar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTabBar);