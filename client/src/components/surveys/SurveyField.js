import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input}></input>
			<div className='red-text'>{touched && error}</div>
		</div>
	);
};

export default SurveyField;
