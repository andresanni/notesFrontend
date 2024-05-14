import Note from './Note';
import PropTypes from 'prop-types';

const NotesList = ({ notes, toggleImportanceOf, showAll }) => {
	if (!showAll) {
		notes = notes.filter(note => (note.important ? note : null));
	}

	return (
		<ul>
			{notes.map(note => (
				<Note
					key={note.id}
					note={note}
					toggleImportance={() => toggleImportanceOf(note.id)}
				/>
			))}
		</ul>
	);
};

NotesList.propTypes = {
	notes: PropTypes.array,
	toggleImportanceOf: PropTypes.func,
	showAll: PropTypes.bool,
};
export default NotesList;
