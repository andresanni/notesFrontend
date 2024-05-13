import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import NewNoteForm from './components/NewNoteForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import NotesList from './components/NotesList';
import Footer from './components/Footer';
import Togglable from './components/Toglable';

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  const noteFormRef= useRef();

  useEffect(() => {
    noteService.getAll().then((notesList) => {
      setNotes(notesList);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    noteService.setToken(null);
  };

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
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleAddNote = (newNote) => {
    noteFormRef.current.toggleVisibility()

    noteService
      .create(newNote)
      .then((addedNote) => setNotes(notes.concat(addedNote)));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="App">
      <section>
        <h1>Notes app</h1>
        <Notification message={errorMessage} />

        <section>
          {user ? (
            <div>
              <p>{user.name} logged-in</p>
              <button onClick={handleLogout}>logout</button>

              <Togglable buttonLabel="new note" ref = {noteFormRef}>
                <NewNoteForm onSubmit={handleAddNote} />
              </Togglable>
            </div>
          ) : (
            <div>
              <Togglable buttonLabel="login">
                <LoginForm onSubmit={handleLogin} />
              </Togglable>
            </div>
          )}
        </section>

        <button onClick={toggleShowAll}>
          Show {showAll ? 'Important' : 'All'}
        </button>

        <NotesList
          notes={notes}
          toggleImportanceOf={toggleImportanceOf}
          showAll={showAll}
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
