import { useState } from "react";
import { deleteNote } from "../../services/notesServices";
import "../../styles/ConformationBox.css"


export function ConformationBox({ isOpen, onClose,noteId,onDeleteSuccess }) {

const [message,setMessage] = useState("");

if (!isOpen) return null;

async function handleOnDelete() {
       try{
    console.log("NOTE ID: ",noteId)
     const result = await deleteNote(noteId);
    setMessage(result.message)

    onDeleteSuccess();

    setTimeout(()=>{
      onClose();
      setMessage("")
    },1000)


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



  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close-btn" onClick={onClose}>
          &times;
        </button>
        <h1 className="popup-title">Conformation</h1>
        

      <p className="popup-message">
          Do You Want To Delete
        </p>

        
        <div className="popup-buttons">
          <button className="popup-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
           <div className="popup-buttons">
          <button className="popup-delete-btn" onClick={handleOnDelete}>
            Delete
          </button>
        </div>
           <p className="popup-status-message">
          {message}
        </p>

      </div>
    </div>
  );
}