import { api } from "./api";

export const getNotesByUser = async ()=>{
  const response = await api.get("/note/getNotes")
  console.log(response.data)
  return response.data;
}

export const createNote = async(noteData)=>{
  const response = await api.post("/note/create",{
                                  title:noteData.title,
                                  content:noteData.content,
                                  color:noteData.color})

 return response.data;                               
}


export const deleteNote = async(noteID) =>{
  console.log('API: ',noteID)
   const response = await api.delete("/note/delete", {
    data: { noteID: noteID },
  });
  return response.data;
}


export const updateNote = async(updateData,noteId)=>{

  const response = await api.put("/note/update",{
                                  title:updateData.title,
                                  content:updateData.content,
                                  color:updateData.color,
                                noteID:noteId})

 return response.data;                               
}


export const searchNotes = async (query) =>{
  const response = await api.get(`/note/search?query=${query}`);
  return response.data;
}