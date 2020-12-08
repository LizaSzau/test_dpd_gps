//import React from 'react'
import React, {Component} from 'react'
import axios from 'axios'
import {Formik, Field, ErrorMessage} from 'formik'  
import * as Yup from 'yup'
import {usePromiseTracker} from "react-promise-tracker"
import {config} from './config'

	
class Appa extends Component {
	
	constructor(){
		super()
		
		this.state = {
			alma: '1',
		}
	}
	


// ****************************************************************************
// LoadingIndicator
// ****************************************************************************

LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<div className={"loader-top"}>
			<div className={"loader-1"}></div>
		</div>
	);	
}

// ****************************************************************************
// Validation
// ****************************************************************************

EditSchema = Yup.object().shape({
	aLat: Yup.number()
		.required('Latitude is required.')
		.typeError('You must specify a number.')
		.min(-90, 'Latitude must be between -90 and 90.')
		.max(90, 'Latitude must be between -90 and 90.'),
	aLong: Yup.number()
		.required('Latitude is required.')
		.typeError('You must specify a number.')
		.min(-180, 'Latitude must be between -90 and 90.')
		.max(180, 'Longitude must be between -180 and 180.'),
	bLat: Yup.number()
		.required('Latitude is required.')
		.typeError('You must specify a number.')
		.min(-90, 'Latitude must be between -90 and 90.')
		.max(90, 'Latitude must be between -90 and 90.'),
	bLong: Yup.number()
		.required('Latitude is required.')
		.typeError('You must specify a number.')
		.min(-180, 'Latitude must be between -90 and 90.')
		.max(180, 'Longitude must be between -180 and 180.'),
})

// ****************************************************************************
// ProductNewDetails
// ****************************************************************************

 NewPointsForm = (props) => {
console.log(props)
	
	return(
	<div>
		<LoadingIndicator/>
		<Formik
			enableReinitialize
			validateOnChange={true}
				
			initialValues={{ 
				aLat: '', 
				aLong: '', 
				bLat: '', 
				bLong: '', 
			}}

			validationSchema = {EditSchema}

			onSubmit = {(values, actions) => {
				
				let url = config[0].apiURL + 'product/create.php'
				actions.setSubmitting(false)

				actions.setStatus({successMessage: 'The product has successfully added.'})
			
				async function makePostRequest() {

					var params = {
						aLat: values.aLat,
						aLong: values.aLong,
						bLat: values.bLat,
						bLong: values.bLong,
					}
/*
					await axios.post(url, params, actions).catch(err => { 
						let statusMessage 
						alert(434)
						if (err.response) {
							statusMessage = 'Something went wrong. Please, try it later.'
						} else if (err.request) {
							statusMessage = 'The client never received a response. Please, try it later.'
						} else {
							statusMessage = 'Something went wrong. Please, try it later.'
						}
					
						actions.setStatus({errorMessage: statusMessage})
					})
				}
*/

				await axios.post(url, params, actions)
					.then(res => {
						this.setState ({
							alma: 'www',
						})
				})
				.catch(err => { 
					let statusMessage 
					
					if (err.response) {
						if (err.response.status === 404) {
							statusMessage = 'No products found.'
						} else {
							statusMessage = 'Something went wrong. Please, try it later.'
						}
					} else if (err.request) {
						statusMessage = 'The client never received a response. Please, try it later.'
					} else {
						statusMessage = 'Something went wrong. Please, try it later.'
					}

					this.setState ({
						alma: 'eee',
						//statusMessage: statusMessage
					})
				})
				
				
				//*******
			}
				makePostRequest()
			}}
		>

			{props  => (
		
				<form onSubmit={props.handleSubmit}>
					<h3>Point A</h3>
					<div className="bar-flex">
						<div><label htmlFor="alat">Latitude:</label></div>
						<div>
							<Field name="aLat" id="aLat" maxLength="32" />
							<ErrorMessage name="aLat" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="aLong">Longitude:</label></div>
						<div>
							<Field name="aLong" id="aLong" />
							<ErrorMessage name="aLong" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>
					<h3>Point B</h3>
					<div className="bar-flex">
						<div><label htmlFor="bLat">Latitude:</label></div>
						<div>
							<Field name="bLat" id="bLat" maxLength="32" />
							<ErrorMessage name="bLat" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="bLong">Longitude:</label></div>
						<div>
							<Field name="bLong" id="bLong" />
							<ErrorMessage name="bLong" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>
					<div className="bar-flex">
						<div></div>
						<div className="div-btn">
							<button type="submit">Calculate</button>
						</div>
					</div>
					
					{props.status && props.status.errorMessage &&
						<div>
							<div className="error-message-form ">
								{props.status.errorMessage}
							</div>
						</div>
					}
					  
					{props.status && props.status.successMessage &&
						<div>
							<div className="success-message-form ">
								{props.status.successMessage}
							</div>
						</div>
					}
					
			 </form>
			 
			)}
	   
		</Formik>
    </div>
	)
}
}
export default NewPointsForm
