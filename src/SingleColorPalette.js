import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(
			this.props.palette,
			this.props.colorId
		);
		this.state = { format: 'hex' };
		this.changeFormat = this.changeFormat.bind(this);
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

	changeFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { paletteName, emoji } = this.props.palette;
		const { format } = this.state;
		const colorBoxes = this._shades.map(color => (
			<ColorBox
				name={color.name}
				key={color.id}
				background={color[format]}
				showLink={false}
			/>
		));

		return (
			<div className="Palette">
				<Navbar handleChange={this.changeFormat} isSingleColor />
				<div className="Palette-colors">{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default SingleColorPalette;
