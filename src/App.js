import { useState, useEffect } from "react";
import noteService from "./services/notes";
import NewNoteForm from "./components/NewNoteForm";
import Notification from "./components/Notification";
import NotesList from "./components/NotesList";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((notesList) => {
      setNotes(notesList);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        setErrorMessage(`The note with id ${id} doesn´t exist in server`);
        setTimeout(()=>{setErrorMessage(null)},5000)
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleAddNote = (inputValue, isImportant) => {
    const newNote = { content: inputValue, important: isImportant };
    noteService
      .create(newNote)
      .then((addedNote) => setNotes(notes.concat(addedNote)));
  };

  const toggleShowAll = ()=>{
    setShowAll(!showAll)
  }

  return (
    <div className="App">
      <section>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={ toggleShowAll }>Show {showAll ? "Important" : "All"}</button>
        
        <NotesList notes={ notes } toggleImportanceOf={ toggleImportanceOf } showAll= { showAll }/>
      </section>

      <section>
        <h2>Add new note</h2>
        <NewNoteForm onSubmit={handleAddNote} />
      </section>

      <Footer />
    </div>
  );
}

export default App;
