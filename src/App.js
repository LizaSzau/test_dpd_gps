import './App.sass'
import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from './config'
import Result from './result.jsx'

class App extends Component {
	
	constructor(){
		super()
		
		this.state = {
			aLat: '',
			aLong: '',
			bLat: '',
			bLong: '',
			cLat: '',
			cLong: '',
			dLat: '',
			dLong: '',
			perimeter: '',
			rectArea: '',
			rectCost: ''
		}
	}
	
// ----------------------------------------------------------------------------
// Handle Changes
// ----------------------------------------------------------------------------

sendData = () => {
	let url = config[0].apiURL + 'GPS/get_data.php'
	var params = {
		aLat: this.state.aLat,
		aLong: this.state.aLong,
		bLat: this.state.bLat,
		bLong: this.state.bLong,
	}
	
	trackPromise(
		axios.post(url, params)
			.then(res => {
				if (res.data.error) {
					this.setState({dataError: res.data.error})
					this.showError()
				}

				if (res.data.ok) {
					this.setState({
						cLat: res.data.cLat,
						cLong: res.data.cLong,
						dLat: res.data.dLat,
						dLong: res.data.dLong,
						perimeter: res.data.perimeter,
						rectArea: res.data.area,
						rectCost: res.data.cost
					})
				}
			})
			.catch(err => { 
				this.setState({dataError: 'Something went wrong. Please try it later.'})
				this.showError()
			}
		)
	)
}

// ----------------------------------------------------------------------------
// Show error
// ----------------------------------------------------------------------------

	showError = () => {
		let errorDiv = document.getElementById('errorMessage')
		
		if (errorDiv) {
			errorDiv.className = 'error-message'
			setTimeout(() => {  
				errorDiv.className = 'hide'
			}, 5000)	
		}
	}
	
// ----------------------------------------------------------------------------
// Handle Changes
// ----------------------------------------------------------------------------

handleChange_aLat(event) {
	this.setState({aLat: event.target.value})
}

handleChange_aLong(event) {
	this.setState({aLong: event.target.value})
}

handleChange_bLat(event) {
	this.setState({bLat: event.target.value})
}

handleChange_bLong(event) {
	this.setState({bLong: event.target.value})
}

// ----------------------------------------------------------------------------
// Render
// ----------------------------------------------------------------------------

	render() {
		const values = this.state
		const {dataError} = this.state
	
		return(
			<div className="app">
				<div>
					<h1>Gps coordinates</h1>
					<h3>Point A</h3>
					<div className="bar-flex">
						<div><label htmlFor="alat">Latitude:</label></div>
						<div>
							<input type="text" name="aLat" id="aLat" onChange={this.handleChange_aLat.bind(this)} />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="aLong">Longitude:</label></div>
						<div>
							<input type="text" name="aLong" id="aLong" onChange={this.handleChange_aLong.bind(this)} />
						</div>
					</div>
					<h3>Point B</h3>
					<div className="bar-flex">
						<div><label htmlFor="bLat">Latitude:</label></div>
						<div>
							<input type="text"name="bLat" id="bLat" onChange={this.handleChange_bLat.bind(this)} />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="bLong">Longitude:</label></div>
						<div>
							<input type="text" name="bLong" id="bLong" onChange={this.handleChange_bLong.bind(this)} />
						</div>
					</div>
					<div className="bar-flex">
						<div></div>
						<div className="div-btn">
							<button onClick={this.sendData}>Calculate</button>
						</div>
					</div>
					<div id="errorMessage">{dataError}</div>
				</div>
				<div>
					<h1>Result</h1>
					<Result values={values} />
				
				</div> 
			</div>)
	}
}

export default App
