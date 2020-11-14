import React from "react";
import './picBox.css';

export const PicBox = (props: {pic: string}) => {
	
	return	<div className="Picture">
				<img className = "Image"
					src={`http://awesomegames.bplaced.net/pics/${props.pic}`}
					alt={' Bild wird geladen ... '}
				/>
			</div>
}