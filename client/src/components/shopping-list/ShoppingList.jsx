import React, { useEffect } from 'react';
import { Container, ListGroup } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems } from '../../_actions/item';
// import Spinner from '../layout/Spinner.jsx';
import ShoppingItem from '../shopping-list/ShoppingItem.jsx';
import PropTypes from 'prop-types';

const ShoppingList = ({ item: { items, loading }, getItems }) => {
	useEffect(() => {
		getItems();
	}, [getItems]);

	// if (loading && items.length === 0) {
	// 	return <Spinner />;
	// }

	return (
		<Container>
			<ListGroup>
				<TransitionGroup className='shopping-list'>
					{!loading && items.length === 0 ? (
						<CSSTransition classNames='fade' timeout={750}>
							<p className='text-muted'>
								No items to show, add some now...
							</p>
						</CSSTransition>
					) : (
						items.map(item => (
							<CSSTransition
								key={item._id}
								classNames='fade'
								timeout={750}
							>
								<ShoppingItem item={item} />
							</CSSTransition>
						))
					)}
				</TransitionGroup>
			</ListGroup>
		</Container>
	);
};

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList);
