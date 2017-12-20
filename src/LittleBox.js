import React, { Component } from 'react';

export default class LittleBox extends Component {
	render() {
		const { color, id } = this.props;

		const bBStyle = {
			width: '80px',
			height: '80px',
			backgroundColor: color
		};

		return (
				<div
					style={bBStyle}
					id={id}
					key={id}>
					<span>{id}</span>
				</div>
			)
	}
}
