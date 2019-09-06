import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

const fields = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' }
];

const SurveyForm = props => {
	return (
		<div>
			<form onSubmit={props.handleSubmit(values => console.log(values))}>
				{fields.map(({ label, name }) => (
					<Field
						key={name}
						component={SurveyField}
						label={label}
						type='text'
						name={name}
					/>
				))}
				<Link to='/' className='red btn-flat left white-text'>
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

	fields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a valid ${name}`;
		}
	});

	return errors;
};

export default reduxForm({ validate, form: 'surveyForm' })(SurveyForm);
