import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = props => {
	return (
		<div>
			<form onSubmit={props.handleSubmit(props.surveySubmit)}>
				{formFields.map(({ label, name }) => (
					<Field
						key={name}
						component={SurveyField}
						label={label}
						type='text'
						name={name}
					/>
				))}
				<Link to='/surveys' className='red btn-flat left white-text'>
					Cancel
				</Link>
				<button
					className='teal btn-flat right white-text'
					type='submit'
				>
					Next
					<i className='material-icons right'>done</i>
				</button>
			</form>
		</div>
	);
};

const validate = values => {
	const errors = {};

	formFields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a valid ${name}`;
		}
	});

	errors.emails = validateEmails(values.emails || '');

	return errors;
};

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
