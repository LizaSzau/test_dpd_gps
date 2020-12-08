import React from 'react'

const Forma  = (props) => {

	return (
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
			 
	)
}			 
			 
export default Forma