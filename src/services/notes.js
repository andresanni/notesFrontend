import axios from 'axios';
const baseUrl = 'https://notesbackend-0ji0.onrender.com/api/notes'


const getAll = ()=>{
    const request = axios.get(baseUrl);    
    return request.then(response=> response.data);
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