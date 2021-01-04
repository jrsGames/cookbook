import React from 'react';
import './sortableComponent.css';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

interface SortableComponentProps {
	items: any[]
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

export class SortableComponent extends React.Component<SortableComponentProps, SortableComponentState> {
	
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
	};
	
	render() {
		return <SortableList distance={1} axis="xy" items={this.state.items} onSortEnd={this.onSortEnd} />;
	}
}