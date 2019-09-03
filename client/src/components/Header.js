import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments';

const Header = props => {
	const renderContent = () => {
		switch (props.auth) {
			case null:
				return 'Loading';
			case false:
				return (
					<li>
						<a href='/auth/google'>Login</a>
					</li>
				);

			default:
				return (
					<>
						<li>
							<Payments />
						</li>
						<li>
							<a>Credits: {props.auth.credits}</a>
						</li>
						<li>
							<a href='/api/logout'>Logout</a>
						</li>
					</>
				);
		}
	};
	return (
		<div>
			<nav>
				<div className='nav-wrapper'>
					<Link
						to={props.auth ? '/surveys' : '/'}
						className='brand-logo'
					>
						Massacre Mail
					</Link>
					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{renderContent()}
					</ul>
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
