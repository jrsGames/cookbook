import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './mapsContent.css';
import { MapsView } from '../../resources/tours';

const MapsContent = (props: {mapsView: MapsView}) => {
	return (
		<div>
			<a href="https://www.opencyclemap.org/">Zur Radkarte</a> 
			<Map className="Map"
				center={props.mapsView.defaultLatLng}
				zoom={props.mapsView.zoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors">
				</TileLayer>
			</Map>
		</div>
	)
}

export default MapsContent;
