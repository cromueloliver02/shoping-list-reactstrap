import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
	return (
		<img
			src={spinner}
			alt='Loading'
			className='img-fluid d-block m-auto mt-5'
			style={{ width: '50px' }}
		/>
	);
};

export default Spinner;
