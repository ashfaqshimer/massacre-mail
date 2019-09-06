import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Payments = props => {
	return (
		<div>
			<StripeCheckout
				name='Massacre Mail'
				description='$5 for 5 credits'
				amount={500}
				token={token => props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className='btn'>Add Credits</button>
			</StripeCheckout>
		</div>
	);
};

export default connect(
	null,
	actions
)(Payments);
