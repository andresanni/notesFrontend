import Note from './Note'

const NotesList = ({ notes , toggleImportanceOf , showAll})=>{
    
    if(!showAll){
        notes = notes.filter(note=>note.important ? note : null)
    }

    return(
        <ul>
            {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
  )
}

export default NotesList;