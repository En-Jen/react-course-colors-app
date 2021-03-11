import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(
			this.props.palette,
			this.props.colorId
		);
	}

	// Get all shades of given color
	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy)
			);
		}

		// Return only shades 100-900 because shade 50 is just white
		return shades.slice(1);
	}

	render() {
		const colorBoxes = this._shades.map(color => (
			<ColorBox
				name={color.name}
				key={color.id}
				background={color.hex}
				showLink={false}
			/>
		));
		return (
			<div className="Palette">
				<h1>Single Color Palette</h1>
				<div className="Palette-colors">{colorBoxes}</div>
			</div>
		);
	}
}

export default SingleColorPalette;
