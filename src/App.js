import React, { Component } from 'react';
import LittleBox from './LittleBox';
import { getBoxes, reorder, getListStyle, getItemStyle } from './helper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			boxes: getBoxes(5)
		};

		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
	}

	//optional
	onDragStart = initial => {

		const {draggableId, type, source} = initial;

		console.log('Dragging started ... ');
		console.log(draggableId, type, source,
			'initial.draggableId', 'initial.type', 'initial.source');
	};
	//required
	onDragEnd = result => {

		//Synchronous reordering list elements based on the result

		const {draggableId, type, source, destination} = result;

		// dropped outside the list (destination is null)
		if (!result.destination) {
			console.log(result, 'Dragged outside');
			return;
		}

		//
		const boxes = reorder(
			this.state.boxes,
			result.source.index,
			result.destination.index
		);

		this.setState({
			boxes
		});

		//what's going on exactly?
		console.log(result, 'Result'); // {draggableId: "box-2", type: "BOX", source: {index: 4, ...}, destination: {index: 3, ...}
		console.log(source.index, 'Result-Index');
		console.log(destination.index, 'Destination-Index');
		console.log(draggableId, type, 'result.draggableId', 'result.type');
		console.log('Dragging ended');
	};

	render() {
		const boxes = this.state.boxes;
		console.log(boxes, 'Initial State');

		return (
			<DragDropContext
				className="row"
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
			>
				<Droppable
					className="col-sm-4"
					droppableId="droppable-1"
					type="BOX"
				>
					{/*The React children of a Droppable must be a function that returns a ReactElement */}
					{(provided, snapshot) => (
						<div
							className="col-sm-4"
							//you must bind the provided.innerRef to the highest possible DOM node in the ReactElement
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{boxes.map(box => (
								<Draggable
									draggableId={box.id}
									key={box.id}
									type="BOX"
								>
									{/*The React children of a Draggable must be a function that returns a ReactElement */}
									{(provided, snapshot) => (
										<div>
											<div
												//bind the innerRef function to the ReactElement that you want to be considered the Draggable node
												ref={provided.innerRef}
												style={getItemStyle(
													//his is an Object or null that contains an a number of styles that needs to be applied to the Draggable
													provided.draggableStyle,
													snapshot.isDragging
												)}
												// a number of props that need to be applied to the Draggable node.
												// The simplest approach is to spread the props onto the draggable node
												{...provided.dragHandleProps}
											>
												<LittleBox
													color={box.color}
													id={box.id}
													key={box.id}
												/>
											</div>
											{/* when the library moves to React 16 this will be cleaned up a
											little bit as we will be able to return the placeholder as a sibling to your child
											function without you needing to create a wrapping element */}
											{provided.placeholder}
										</div>
									)}
								</Draggable>
							))}
							{/* This is used to create space in the Droppable as needed during a drag */}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default App;
