import React from "react";
import PlotlyChart from 'react-plotlyjs-ts';
import { Tour } from "../../resources/tours";

interface HeightsContentProps {
	tour: Tour
}

export class HeightsContent extends React.Component<HeightsContentProps,{}> {
	
    public render() {
	
		const {name, stops} = this.props.tour;
	
		const names = ['', stops[0].name];
		const distancesToNext = [0, 0, stops[0].distanceToNext];
		const heights = [0, stops[0].height];
	
		for(let i=1; i < stops.length; i++){
			names.push(stops[i].name);
			distancesToNext.push(stops[i].distanceToNext);
			heights.push(stops[i].height);
		};
		
		for(let i=1; i < distancesToNext.length; i++){
			distancesToNext[i] = distancesToNext[i-1] + distancesToNext[i];
		};
		
		names.push('');
		heights.push(0);
		
		const maxHeight: number = Math.max(...heights);
		const SCALING_FACTOR: number = 1.2;
		
		const textposition: string[] = [];
		names.forEach((_pos, index) => {
			if(index % 2 === 0){
				textposition.push('bottom center');
				if(index === names.length-2){
					textposition[index] = 'bottom left';
				}
			} else {
				textposition.push('top center');
				if(index === 1){
					textposition[index] = 'top right';
				}
				if(index === names.length-2){
					textposition[index] = 'top left';
				}
			}
		});
					
        const data = [
            {
                marker: {
                    color: 'rgb(76, 175, 80)'
                },
                type: 'scatter',
				mode: 'lines+markers+text',
				text: names,
				textposition: textposition,
				hoverinfo: 'text+y',
                x: distancesToNext,
                y: heights,
				fill: 'tozerox'
            }
        ];
        const layout = {
            annotations: [
            ],
            title: name,
            xaxis: {
                title: 'km'
            },
			yaxis: {
				range: [0, maxHeight * SCALING_FACTOR]
			}
        };
        return (
            <PlotlyChart data={data}
                         layout={layout}
            />
        );
    }
}