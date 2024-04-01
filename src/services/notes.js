import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/notes'


const getAll = ()=>{
    const request = axios.get(baseUrl);
    //Para provocar errores
    const nonExistingNote = {
        id:1000,
        content: "This note is not saved to server",
        important: true
    }

    return request.then(response=> response.data.concat(nonExistingNote))
}

const create =  (newNote)=>{
    const request = axios.post(baseUrl, newNote);
    return  request.then(response=> response.data)
}

const update = (id, updatedNote) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedNote);
    return request.then(response => response.data)
}

export default { getAll, create, update };