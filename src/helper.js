/**
 * Generating a number sequence [0,1,2,4]
 * Generating data array [{id: "box-0", content: "box-0", color: #random}]
 *
 * @param count
 * @returns {{id: string, content: string, color: string}[]}
 */
export const getBoxes = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `box-${k}`,
		content: `box ${k}`,
		color: '#' + Math.floor(Math.random() * 16777215).toString(16)
	}));

/**
 * Reordering the box order based on
 *
 * @param list (the previous state)
 * @param startIndex (source / previous index of dragged element)
 * @param endIndex (destination / new index of dragged element)
 * @returns {any[]} (reordered array)
 */
export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	console.log(result, 'Previous State');

	//extracted dragged item
	const [removed] = result.splice(startIndex, 1);
	console.log(removed, 'Removed Item');

	//add dragged item to destination / new array index
	result.splice(endIndex, 0, removed);
	console.log(result, 'Reordered Array');

	return result;
};

/**
 * General styling for the (List-)Box-Container
 *
 * @param isDraggingOver
 * @returns {{background: string, padding: number, width: number}}
 */
export const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: 8,
	width: 95
});

/**
 * General styling for the the boxes
 *
 * @param draggableStyle (Object that contains an a number of styles that needs to be applied to the Draggable)
 * @param isDragging (boolean property of Draggable snapshot object)
 * @returns {{userSelect: string, margin: string, opacity: number}}
 */
export const getItemStyle = (draggableStyle, isDragging) => ({
	userSelect: 'none',
	cursor: 'grab',
	margin: `0 0 8px 0`,
	opacity: isDragging ? 0.5 : 1,
	// spread out the REQUIRED styles provided by the dnd-lib
	...draggableStyle
});