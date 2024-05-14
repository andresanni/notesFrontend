import { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ onSubmit }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		const credentials = { username, password };
		onSubmit(credentials);
		setUsername('');
		setPassword('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
