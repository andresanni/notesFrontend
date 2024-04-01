import { useState } from 'react';

const NewNoteForm = ({ onSubmit })=>{
    
   const [inputValue, setInputValue] = useState("");
   const [isImportant, setIsImportant] = useState(false);
   
   const handleInputChange = (event)=>{
        setInputValue(event.target.value);
        console.log(inputValue);
   }

    const hanldeCheckBoxChange = (event)=>{
        setIsImportant(event.target.checked);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit(inputValue, isImportant);
        setInputValue("");
        setIsImportant(false);
    }


    return(
    <form onSubmit={ handleSubmit }>
        <input onChange= {handleInputChange} value= {inputValue}/>
        <input type="checkbox" id="important" name="important" checked= {isImportant} onChange= {hanldeCheckBoxChange}/> 
        <label htmlFor="important"> Make Important</label><br></br>
        <button type="submit">Add</button>
    </form>        
    )
}

export default NewNoteForm;