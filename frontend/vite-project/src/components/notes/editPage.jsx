






import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateNote } from "../../services/notesServices";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../styles/editNote.css"
import { Nav } from "../navBar";

export function EditPage(){
    return(
        <>
        <Nav/>
        <EditNote/>
        </>
    )
}


export function EditNote() {
  const location = useLocation();
  const { notes } = location.state;

  const [noteData, setNoteData] = useState(notes || {});
  const [message, setMessage] = useState("");
  const [updatedNote, setUpdatedNote] = useState(notes || { title: "", content: "", color: "" });

  useEffect(() => {
    if (notes) {
      setNoteData(notes);
      setUpdatedNote(notes);
    }
  }, [notes]);

  function handleOnChange(e) {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  }

  function handleEditorChange(content) {
    setUpdatedNote({ ...updatedNote, content: content });
  }

  function handleColorSelect(colorValue) {
    setUpdatedNote({ ...updatedNote, color: colorValue });
  }

  async function handleFormSubmit(e) {
    try {
      e.preventDefault();
      const result = await updateNote(updatedNote, noteData._id);
      setMessage(result.message);
    } catch (error) {
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

  // React Quill modules configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'bullet' }],
      [{ 'color': [] }],
      ['clean']
    ],
  };

  return (
    <div className="editNote_container">
      <h1>Edit Note</h1>

      <form className="editNote_form" onSubmit={handleFormSubmit}>
        <div className="editNote_colorPicker">
          {["#FEC971", "#FE9B72", "#B793FF", "#00D4FF", "#E4EF8D","#ffc8dd","#90e0ef","#fcf6bd"].map((color) => (
            <div key={color}>
              <input
                type="radio"
                name="color"
                value={color}
                checked={updatedNote.color === color}
                onChange={handleOnChange}
                id={`color-${color}`}
                className="editNote_colorRadio"
              />
              <label
                htmlFor={`color-${color}`}
                className={`editNote_colorOption ${updatedNote.color === color ? "editNote_selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            </div>
          ))}
        </div>

        <label className="editNote_label" htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={updatedNote.title}
          onChange={handleOnChange}
          className="editNote_input"
          required
        />

        <label className="editNote_label" htmlFor="content">Content</label>
        <ReactQuill
          value={updatedNote.content}
          onChange={handleEditorChange}
          modules={modules}
          className="editNote_editor"
          theme="snow"
        />

        <input
          type="submit"
          value="Update Note"
          className="editNote_submit"
        />
      </form>

      {message && <p className="editNote_message">{message}</p>}
    </div>
  );
}