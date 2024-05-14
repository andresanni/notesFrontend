import PropTypes from 'prop-types';

const Notification = ({ message }) => {
	if (!message) {
		return null;
	} else {
		return <div className='error'>{message}</div>;
	}
};

Notification.propTypes = {
	message: PropTypes.string,
};
export default Notification;
