import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

const SurveyList = ({ surveys, fetchSurveys }) => {
	useEffect(() => {
		fetchSurveys();
	}, []);

	return (
		<div>
			{surveys.length === 0 ? (
				<>
					<h3 className='center'>You have not created any surveys</h3>
					<p className='center'>
						CLick on the + button below to create a new survey.
					</p>
				</>
			) : (
				surveys.reverse().map(survey => {
					return (
						<div key={survey._id} className='card darken-1'>
							<div className='card-content text-white'>
								<span className='card-title'>
									{survey.title}
								</span>
								<p>{survey.body}</p>
								<p className='right'>
									Date Sent:{' '}
									{new Date(
										survey.dateSent
									).toLocaleDateString()}{' '}
								</p>
							</div>
							<div className='card-action'>
								<a>Yes Votes: {survey.yes}</a>
								<a>No Votes: {survey.no}</a>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

const mapStateToProps = ({ surveys }) => {
	return { surveys };
};

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList);
