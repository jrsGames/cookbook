import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabPanel } from '../TabPanel/tabPanel';
import './tabBar.css';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/initialState';
import { Dispatch } from 'redux';

function generalTabProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

interface TabBarProps {}

interface TabBarState {
	tabIndex: number,
}

const FILTER = 'Filter';
const IMPORT = 'Import';
const EXPORT = 'Export';

const TAB_NAMES: string[] = [FILTER, IMPORT, EXPORT];

const INITIAL_TAB_INDEX = 0;

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
		
	render(){			
		return (
			<div className={'TabBar-show'} style={{'display': 'flex'}}>
					<Tabs
						value={this.state.tabIndex}
						onChange={(_event: React.ChangeEvent<{}>, index: number) => this.updateTabIndex(index)}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						orientation="vertical"
						scrollButtons="auto"
						aria-label="scrollable auto tabs"
					>
						<Tab key='filter' className="LabelTab" label={"Filter"} {...generalTabProps(0)}/>
						<Tab key='import' className="LabelTab" label={"Import"} {...generalTabProps(1)} />
						<Tab key='export' className="LabelTab" label={"Export"} {...generalTabProps(2)} />
						<Tab key='filler' className="LabelTab" disabled {...generalTabProps(3)} />
					</Tabs>
					{TAB_NAMES.map((tabName, index) => {
						let content = <div/>;
						switch(tabName) {
							case FILTER: {content = <div> {tabName} </div>; break;}
							case IMPORT: {content = <div> {tabName} </div>; break;}
							case EXPORT: {content = <div> {tabName} </div>; break;}
							default: break;
						}
						return	<TabPanel key={index} value={this.state.tabIndex} index={index}> {content} </TabPanel>; 
					})}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const TabBar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTabBar);