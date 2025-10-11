import { useEffect, useState } from "react"
import { createNote, updateNote } from "../../services/notesServices"
import "../../styles/newNotes.css"
import { Nav } from "../navBar"
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


export function NewNote(){
return(<>
<Nav/>
<CreateNewNote/>
</>)
}
export function CreateNewNote(){
    const [noteData ,setNoteData] = useState({
        title:"",
        content:"",
        color:""
    })

    const [message,setMessage] = useState("");

    function handleOnChange(e){
        setNoteData({...noteData,[e.target.name]:e.target.value})
    }

    // ✅ CHANGED: Added color selection handler
    function handleColorSelect(colorValue){
        setNoteData({...noteData, color: colorValue})
    }

    function handleContentChange(value) {
  setNoteData({ ...noteData, content: value });
}

    useEffect(()=>{
        console.log(noteData)
    },[noteData])

    async function handleFormSubmit(e){
      try{
         e.preventDefault();
        const result = await createNote(noteData);
        setMessage(result.message);
      }catch(error){
        if (
        error.response &&
        (error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 404)
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("SomeThing Went Wrong Try Again");
      }
      }
    }
      const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'bullet' }],
      [{ 'color': [] }],
      ['clean']
    ],
  };

    return(
        <div className="newNotes_container">
            <h1 className="newNotes_title">Create A New Note</h1>

            <div className="newNotes_formContainer">
                <form className="newNotes_form" onSubmit={handleFormSubmit}>
                    
                    {/* ✅ CHANGED: Color picker section with circular colors */}
                    <div className="newNotes_colorPicker">
                        {["#FEC971", "#FE9B72", "#B793FF", "#00D4FF", "#E4EF8D","#ffc8dd","#90e0ef","#fcf6bd"].map((color) => (
                            <div key={color}>
                                <input 
                                    type="radio" 
                                    name="color" 
                                    value={color} 
                                    onChange={handleOnChange}
                                    id={`color-${color}`}
                                    className="newNotes_colorRadio"
                                />
                                <label 
                                    htmlFor={`color-${color}`}
                                    className={`newNotes_colorOption ${noteData.color === color ? 'selected' : ''}`}
                                    style={{backgroundColor: color}}
                                    onClick={() => handleColorSelect(color)}
                                />
                            </div>
                        ))}
                    </div>

                    <label className="newNotes_label" htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={noteData.title}  
                        onChange={handleOnChange} 
                        className="newNotes_input"
                        required
                    />

                    <label className="newNotes_label" htmlFor="content">Content</label>  
                    {/* <textarea 
                        name="content" 
                        value={noteData.content} 
                        onChange={handleOnChange} 
                        className="newNotes_textarea"
                        required
                    /> */}


                           <ReactQuill
                              value={noteData.content}
                              onChange={handleContentChange}
                              modules={modules}
                              className="editNote_editor"
                              theme="snow"
                            />

                    
                    
                    <input 
                        type="submit" 
                        value="Create Note"
                        className="newNotes_submit"
                    />
                </form>
                
                {message && <p className="newNotes_message">{message}</p>}
            </div>
        </div>
    )
}
