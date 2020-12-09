import React from 'react' 

// ****************************************************************************
// ProductNewDetails
// ****************************************************************************

const Result = (props) => {
	const cLat = props.values.cLat
	const cLong = props.values.cLong
	const dLat = props.values.dLat
	const dLong = props.values.dLong
	const perimeter = props.values.perimeter
	const rectArea = props.values.rectArea
	const rectCost = props.values.rectCost

	let tPerimeter = perimeter
	if (tPerimeter)  tPerimeter += ' meter'
		
	let tArea = rectArea
	if (tArea) tArea += ' squaremeter'

	let tCost = rectCost
	if (tCost) tCost += ' EUR'
	
	return (
		<div>
			<h3>Point C</h3>
			<div className="bar-flex">
				<div>Latitude:</div>
				<div className="blue-text">{cLat}</div>
			</div>
			<div className="bar-flex">
				<div>Longitude:</div>
				<div className="blue-text">{cLong}</div>
			</div>
			<h3>Point D</h3>
			<div className="bar-flex">
				<div>Latitude:</div>
				<div className="blue-text">{dLat}</div>
			</div>
			<div className="bar-flex">
				<div>Longitude:</div>
				<div className="blue-text">{dLong}</div>
			</div>
			<hr />
			<div className="bar-flex">
				<div>Perimeter:</div>
				<div className="blue-text">{tPerimeter}</div>
			</div>
			<div className="bar-flex">
				<div>Area:</div>
				<div className="blue-text">{tArea}</div>
			</div>
			<div className="bar-flex">
				<div>Total cost:</div>
				<div className="blue-text">{tCost}</div>
			</div>
		</div>
	)
}

export default Result
