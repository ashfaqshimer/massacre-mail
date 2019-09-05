import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

const SurveyForm = () => {
	return <div>SurveyForm!</div>;
};

export default reduxForm({ form: 'surveyForm' })(SurveyForm);
