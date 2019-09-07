import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ cancel, formValues, submitSurvey, history }) => {
	return (
		<div>
			<h5>Please confirm your entries</h5>
			<div className='center'>
				{formFields.map(({ name, label }) => {
					return (
						<div key={name}>
							<label>{label}</label>
							<div>{formValues[name]}</div>
						</div>
					);
				})}
			</div>
			<button
				className='yellow darken-3 white-text btn-flat'
				onClick={cancel}
			>
				Back
			</button>
			<button
				className='green right btn-flat white-text'
				onClick={() => submitSurvey(formValues, history)}
			>
				Send Survey <i className='material-icons right'>email</i>
			</button>
		</div>
	);
};

const mapStateToProps = state => {
	return { formValues: state.form.surveyForm.values };
};

export default connect(
	mapStateToProps,
	actions
)(withRouter(SurveyFormReview));
