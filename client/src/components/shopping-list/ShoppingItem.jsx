import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../../_actions/item';
import { ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ShoppingItem = ({
	item,
	auth: { isAuthenticated, loading },
	deleteItem
}) => {
	return (
		<ListGroupItem>
			{!loading && isAuthenticated && (
				<Button
					color='danger'
					size='sm'
					className='mr-3'
					onClick={() => deleteItem(item._id)}
				>
					<i className='fas fa-times'></i>
				</Button>
			)}
			{item.name}
		</ListGroupItem>
	);
};

ShoppingItem.propTypes = {
	item: PropTypes.object.isRequired,
	deleteItem: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deleteItem })(ShoppingItem);
