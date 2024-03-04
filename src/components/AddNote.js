import React, {useContext, useState} from 'react'
import noteContext from "../context/Notes/NoteContext";


const AddNote = (props) => {

  const context = useContext(noteContext);
  const {addNote} = context;
  const [Note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Added successfully", "success");
  }

  const onChange = ({ target }) => {
    setNote({ ...Note, [target.name]: target.value });
  };

  return (
    <div><div className="container my-3">
    <h1>Add your notes</h1>
    <form className='my-3'>
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={Note.title} minLength={3} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={Note.description} minLength={5} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={Note.tag}/>
        </div>
        <button disabled={Note.title.length<3 || Note.description.length<5} onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button>
    </form>
    </div></div>
  )
}

export default AddNote