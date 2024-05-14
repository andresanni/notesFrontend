import { useState } from 'react';
import PropTypes from 'prop-types';

function NewNoteForm({ onSubmit }) {
	const [inputValue, setInputValue] = useState('');
	const [isImportant, setIsImportant] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		const newNote = {
			content: inputValue,
			important: isImportant,
		};
		onSubmit(newNote);
		setInputValue('');
		setIsImportant(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				onChange={event => setInputValue(event.target.value)}
				value={inputValue}
			/>
			<input
				type='checkbox'
				id='important'
				name='important'
				checked={isImportant}
				onChange={event => {
					setIsImportant(event.target.checked);
				}}
			/>
			<label htmlFor='important'> Make Important</label>
			<br></br>
			<button type='submit'>Add</button>
		</form>
	);
}

NewNoteForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default NewNoteForm;
