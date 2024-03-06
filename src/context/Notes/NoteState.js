import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_HOST;
    const notesinit = []
    const [notes, setNotes] = useState(notesinit)
    const [progress, setProgress] = useState(0)

    const getNote = async ()=>{
      setProgress(10);
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authToken": localStorage.getItem('token')
            },
          });
          setProgress(70)
          
          const json = await response.json(); 
          // console.log(json);
          setNotes(json);
          setProgress(100);
    }

    //Add Note
    const addNote = async (title, description, tag)=>{
      setProgress(10);
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authToken": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });
          setProgress(70)
          
          const note = await response.json(); 
          setNotes(notes.concat(note))
          // console.log(json);
          setProgress(100);
        // console.log("Adding new Note");
    }
    
    //Delete Note
    const deleteNote = async (id)=>{
      setProgress(10);
        // const response = 
        await fetch(`${host}/api/notes/deletenote/${id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "authToken": localStorage.getItem('token')
            },

        });
          setProgress(70)
        // const json = await response.json(); 
        // console.log(json);

        // console.log(`deleting ${id}`);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        setProgress(100);

    }


    //edit note
    const editNote = async (id, title, description, tag)=>{
      setProgress(10);
        // const response = 
        await fetch(`${host}/api/notes/updatenote/${id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "authToken": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });
          setProgress(40)
          // const json = await response.json(); 
          // console.log(json);

          let newNotes = JSON.parse(JSON.stringify(notes));


        // console.log(`editing ${id}`);
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                setProgress(70)
                element.title=title;
                element.description=description;
                element.tag=tag;
                break;
            }
        }
        setNotes(newNotes);
        setProgress(100);

      }



    return(

    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote, setProgress, progress}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;