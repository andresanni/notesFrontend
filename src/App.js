import { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import NewNoteForm from './components/NewNoteForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import NotesList from './components/NotesList';
import Footer from './components/Footer';

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [showAll, setShowAll] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((notesList) => {
      setNotes(notesList);
    });
  }, []);

  useEffect(()=>{

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

    if(loggedUserJSON){
      const user= JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }

  }, []);

  const handleLogin = async (username, password) => {
    try {
      //Solicitud Post con las credenciales, devuelve user
      const user = await loginService.login({ username, password });
      
      //Guardo los datos del user en el local storage del navegador
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      
      //Seteo el token en el servivio para poder incrustrarlo en las solicitudes
      noteService.setToken(user.token)
      //Finalmente seteo el ususario      
      setUser(user);

    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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

  const handleAddNote = (inputValue, isImportant) => {
    const newNote = { content: inputValue, important: isImportant };
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
              <NewNoteForm onSubmit={handleAddNote} />
            </div>
          ) : (
            <LoginForm onSubmit={handleLogin} />
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
