import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

const SurveyNew = () => {
	const [showFormReview, setshowFormReview] = useState(false);
	const toggleForm = () => {
		console.log('toggled');
		setshowFormReview(!showFormReview);
	};

	return (
		<div>
			{showFormReview ? (
				<SurveyFormReview cancel={toggleForm} />
			) : (
				<SurveyForm surveySubmit={toggleForm} />
			)}
		</div>
	);
};

export default reduxForm({ form: 'surveyForm' })(SurveyNew);
