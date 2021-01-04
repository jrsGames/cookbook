import React from 'react';
import './sortableComponent.css';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { moveRecipe } from '../../redux/action_creators/BookState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface SortableComponentProps {
	items: any[],
	moveRecipe: (oldIndex: number, newIndex: number) => void
}

interface SortableComponentState {
	items: any[]
}

const SortableItem = SortableElement(({value}: {value: any, index: number}) => (
	<div>{value}</div>
));

const SortableList = SortableContainer(({items}: {items: any[]}) => {
	return (
		<div className="SortableList">
			{items.map((value, index) => (
				<SortableItem key={`item-${index}`} index={index} value={value} />
			))}
		</div>
	);
});

class UnconnectedSortableComponent extends React.Component<SortableComponentProps, SortableComponentState> {
	
	constructor(props: SortableComponentProps) {
		super(props);
		this.state = {
			items: this.props.items
		}
	};
	
	componentDidUpdate(prevProps: SortableComponentProps) {
		if(prevProps.items !== this.props.items) {
			this.setState({items: this.props.items});
		}
	}
	
	onSortEnd = ({oldIndex, newIndex}: any) => {
		this.setState(({items}: any) => ({
			items: arrayMove(items, oldIndex, newIndex),
		}));
		this.props.moveRecipe(oldIndex, newIndex);
	};
	
	render() {
		return <SortableList distance={1} axis="xy" items={this.state.items} onSortEnd={this.onSortEnd} />;
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	moveRecipe: (oldIndex: number, newIndex: number) => dispatch(moveRecipe(oldIndex, newIndex))
});

export const SortableComponent = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSortableComponent);