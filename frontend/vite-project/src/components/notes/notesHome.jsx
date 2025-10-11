import { deleteNote, getNotesByUser, searchNotes } from "../../services/notesServices";
import "../../styles/notesHome.css"
import { useEffect, useState } from "react";
import { ConformationBox } from "./ConformationBox";
import { useNavigate } from "react-router";

export function NotesHome(){
  const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [userNotes,setUserNotes] = useState();
    const [message,setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState("");


  function handleClosePopup() {
    setShowPopup(false);
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
  try{
      e.preventDefault();
      if (!query.trim()) {
        setMessage("");
    getNotes();
    return;
  }

  const result = await searchNotes(query);

if (!result?.notes?.length) {
  setMessage("No matching notes found");
  setUserNotes([]);
} else {
  setUserNotes(result.notes);
  setMessage("");
}
  }catch(error){
    console.log("hello g khan g")
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
  };

  async function getNotes(){
    const result = await getNotesByUser();
    if(!result || result.length===0){
        setMessage("No Notes Available")
    }else{
        setUserNotes(result);
    }
  }

  async function handleOnDelete(noteId){
    setSelectedNoteId(noteId);
    setShowPopup(true)
  }

  function handleOnEdit(notes){
    navigate("/editPage", { state: { notes } })
  }

  useEffect(()=>{
   getNotes();
  },[])

  return (
  
<>
  <div className="notesHome_container">
      <form className="notesHome_searchContainer" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="notesHome_searchInput"
        />
        <button type="submit" className="notesHome_searchBtn">
          Search
        </button>
      </form>

      {message && <p className="notesHome_message">{message}</p>}

      <div className="notesHome_notesGrid">
        {/* {userNotes &&
          userNotes.map((note) => (
            <div
              key={note._id}
              className="notesHome_noteCard"
              style={{
                backgroundColor: note.color,
              }}
            >
              <div className="notesHome_noteCard_topPart">
                <h3 className="notesHome_noteTitle">{note.title}</h3>
              <div className="notesHome_noteCard_topPart_icon">
                <i class="fa-solid fa-pen fa-lg" onClick={()=>handleOnEdit(note)}></i>
              <i class="fa-solid fa-trash fa-lg" onClick={()=>handleOnDelete(note._id)}></i>
              </div>
              </div>
              <p className="notesHome_noteContent" >{note.content}</p>
              <small className="notesHome_noteDate">
                Created At: {new Date(note.createdAt).toLocaleString()}
              </small>
              
            </div>
          ))} */}


          {userNotes &&
  userNotes.map((note) => (
    <div
      key={note._id}
      className="notesHome_noteCard"
      style={{
        backgroundColor: note.color,
      }}
    >
      <div className="notesHome_noteCard_topPart">
        <h3 className="notesHome_noteTitle">{note.title}</h3>
        <div className="notesHome_noteCard_topPart_icon">
          <i className="fa-solid fa-pen fa-lg" onClick={() => handleOnEdit(note)}></i>
          <i className="fa-solid fa-trash fa-lg" onClick={() => handleOnDelete(note._id)}></i>
        </div>
      </div>

      {/* render formatted HTML content */}
      <div
        className="notesHome_noteContent"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>

      <small className="notesHome_noteDate">
        Created At: {new Date(note.createdAt).toLocaleString()}
      </small>
    </div>
  ))}

      </div>
      
    </div>

   <ConformationBox 
  isOpen={showPopup} 
  onClose={handleClosePopup}
  noteId={selectedNoteId} 
   onDeleteSuccess={getNotes} 
/>

</>

  );
};