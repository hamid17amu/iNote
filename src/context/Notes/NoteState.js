import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const notesinit = []
    const [notes, setNotes] = useState(notesinit)

    const getNote = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDY0OTNmYmRjNTQyZDkwOTY2OGM5In0sImlhdCI6MTcwOTQ2ODA2OH0.olHLaUoGfa2UqTjGJXpwBMX5_Go-i0Zwz5PBSqakBfQ"
            },
          });
          
          const json = await response.json(); 
          console.log(json);
          setNotes(json);
    }

    //Add Note
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDY0OTNmYmRjNTQyZDkwOTY2OGM5In0sImlhdCI6MTcwOTQ2ODA2OH0.olHLaUoGfa2UqTjGJXpwBMX5_Go-i0Zwz5PBSqakBfQ"
            },
            body: JSON.stringify({title, description, tag}), 
          });
          
          const note = await response.json(); 
          setNotes(notes.concat(note))
          // console.log(json);

        // console.log("Adding new Note");
    }
    
    //Delete Note
    const deleteNote = async (id)=>{
        // const response = 
        await fetch(`${host}/api/notes/deletenote/${id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDY0OTNmYmRjNTQyZDkwOTY2OGM5In0sImlhdCI6MTcwOTQ2ODA2OH0.olHLaUoGfa2UqTjGJXpwBMX5_Go-i0Zwz5PBSqakBfQ"
            },

        });
          
        // const json = await response.json(); 
        // console.log(json);

        // console.log(`deleting ${id}`);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }


    //edit note
    const editNote = async (id, title, description, tag)=>{
        // const response = 
        await fetch(`${host}/api/notes/updatenote/${id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDY0OTNmYmRjNTQyZDkwOTY2OGM5In0sImlhdCI6MTcwOTQ2ODA2OH0.olHLaUoGfa2UqTjGJXpwBMX5_Go-i0Zwz5PBSqakBfQ"
            },
            body: JSON.stringify({title, description, tag}), 
          });

          // const json = await response.json(); 
          // console.log(json);

          let newNotes = JSON.parse(JSON.stringify(notes));


        // console.log(`editing ${id}`);
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return(

    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;