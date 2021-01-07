import React from 'react';
import { Alert, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AppAlert = ({ alerts }) => {
	return (
		<Container className='mt-1'>
			<TransitionGroup>
				{alerts.length > 0 &&
					alerts.map(alert => (
						<CSSTransition key={alert.id} classNames='item' timeout={750}>
							<Alert color={alert.type} className='mb-2 py-1 px-3'>
								<i className='fas fa-info-circle'></i> {alert.msg}
							</Alert>
						</CSSTransition>
					))}
			</TransitionGroup>
		</Container>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(AppAlert);
