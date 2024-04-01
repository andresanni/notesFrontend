const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "Make not important" : "Make important";

  return (
    <li className="note">
      <p>{note.content}</p>
      <p>
        <strong>Important:</strong> {note.important.toString()}{" "}
      </p>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
