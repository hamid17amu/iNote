import React, {useContext, useEffect,useRef, useState} from 'react'
import noteContext from "../context/Notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote'


const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNote, editNote} = context;

    useEffect(() => {
      getNote()
      //eslint-disable-next-line
    }, [])

    const [Note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote =(currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleClick=(e)=>{
        editNote(Note.id, Note.etitle, Note.edescription, Note.etag)
        refClose.current.click();
        e.preventDefault();
        console.log(Note);

      }
    
      const onChange = ({ target }) => {
        setNote({ ...Note, [target.name]: target.value });
      };
    
    
  return (
    <div>
        <AddNote/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your notes</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="container my-3">
                        {/* <h4>Edit your notes</h4> */}
                        <form className='my-3'>
                            <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={Note.etitle} onChange={onChange} minLength={3} required/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="edescription" name='edescription' value={Note.edescription} onChange={onChange} minLength={3} required/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name='etag' value={Note.etag} onChange={onChange}/>
                            </div>
                            {/* <button onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button> */}
                        </form>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={Note.etitle.length<3 || Note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
        <div className="row my-3">
            <h2>Your Notes</h2>
            
            {notes.length===0 && <div className='container mx-2'> No notes to display.</div>}
            
            {notes.map((note)=>{
                return <NoteItem key={note.id} updateNote={updateNote} note={note}/>
            })}
        </div>
    </div>
  )
}

export default Notes