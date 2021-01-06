import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../../_actions/item';
import { ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ShoppingItem = ({ item, deleteItem }) => {
	return (
		<ListGroupItem>
			<Button
				color='danger'
				size='sm'
				className='mr-3'
				onClick={() => deleteItem(item._id)}
			>
				&times;
			</Button>
			{item.name}
		</ListGroupItem>
	);
};

ShoppingItem.propTypes = {
	item: PropTypes.object.isRequired,
	deleteItem: PropTypes.func.isRequired
};

export default connect(null, { deleteItem })(ShoppingItem);
