import { expect } from "chai";
import { Notes } from "../models/note.js";
import mongoose from "mongoose";
import { createNote, deleteNote, getNotesByUser, searchNotes,getSingleNote,updateNote } from "../controllers/noteController.js";

describe("createNote",()=>{
        before(async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
          await Notes.create({
          title: "Test",
          content: "Testing",
          color: "black",
        });
      });
    
      after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      });



  it("should return 400 if data is incomplete", async () => {
    let statusCode, message;

    const req = { body: { title: "Test" }, user: { id: "12345" } };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await createNote(req, res, () => {});
    expect(statusCode).to.equal(400);
    expect(message).to.equal("Incomplete data");
  });

 
  it("should return 200 when note is created successfully",async()=>{
    let statusCode,message;
const fakeUserId = new mongoose.Types.ObjectId().toString();

    const req = {body:{title:"Test",content:"Testing",color:"black"},user: fakeUserId};
    const res = {
      status : (code)=>{
        statusCode = code;
        return res;
      },
      json:(data)=>{
        message = data.message;
      }
    }

    await createNote(req,res,()=>{});

    expect(statusCode).to.equal(200);
    expect(message).to.equal("Created SuccessFully")

  })
})

describe("getNotesByUser",()=>{
          before(async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
          await Notes.create({
          title: "Test",
          content: "Testing",
          color: "black",
          user: new mongoose.Types.ObjectId(),
        });

      });
    
      after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      });

  it("should return 200 with the data",async()=>{
    const fakeUserId = new mongoose.Types.ObjectId().toString();
    let statusCode ,result;
    const req = {user:{fakeUserId}};
    const res = {
      status: (code)=>{
        statusCode = code;
        return res
      },
      json:(data)=>{
        result = data;
      }
    }

    await getNotesByUser(req,res,()=>{});

    expect(statusCode).to.equal(200);
    expect(result).to.be.an("array");

  })    

})

describe("deleteNote", () => {
  let note;
  let userId;

  before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    userId = new mongoose.Types.ObjectId();

    note = await Notes.create({
      title: "Test",
      content: "Testing",
      color: "black",
      user: userId,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should return 200 if Deleted Successfully", async () => {
    let statusCode, message;

    const req = {
      body: { noteID: note._id },
      user: { id: userId }
    };

    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await deleteNote(req, res, () => {});

    expect(statusCode).to.equal(200);
    expect(message).to.equal("Deleted Successfully");
  });


  it("should return 400 if Nothing Selected",async()=>{
    let statusCode, message;
    const req = {body:{noteID:"1234567878"}, user: { id: userId }};
    const res = {
      status:(code)=>{
        statusCode = code;
        return res
      },
      json:(data)=>{
        message = data.message;
      }
    }

      await deleteNote(req,res,()=>{});
      expect(statusCode).to.equal(400);
      expect(message).to.equal("Nothing Selected");
  })
  


});

describe("searchNotes",()=>{
  let fakeUserId;
      before(async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        fakeUserId = new mongoose.Types.ObjectId().toString();
          await Notes.create({
          title: "Test",
          content: "Testing",
          color: "black",
          user: new mongoose.Types.ObjectId(),
        });

      });
    
      after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      });


   it("should return 400 if search query not required",async()=>{
    let statusCode,message;
    const req = {query:"",user: { id: fakeUserId }};
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

   
    await searchNotes(req,res,()=>{});

    expect(statusCode).to.equal(400);
    expect(message).to.equal("Search query required")
  


   })


   it("should return 200 with the data",async()=>{
       let statusCode ,result;
    const req = {query: { query: "Searchable" },user: { id: fakeUserId }};
    const res = {
      status: (code)=>{
        statusCode = code;
        return res
      },
      json:(data)=>{
        result = data;
      }
    }

    await searchNotes(req,res,()=>{});

    expect(statusCode).to.equal(200);
    expect(result.notes).to.be.an("array");

   })

})

describe("updateNote", () => {
  let note, userId;

  before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    userId = new mongoose.Types.ObjectId();

    note = await Notes.create({
      title: "Old Title",
      content: "Old Content",
      color: "blue",
      user: userId,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });


  it("should return 400 if noteID is invalid", async () => {
    let statusCode, message;
    const req = {
      body: { noteID: "12345" },
      user: { id: userId },
    };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await updateNote(req, res, () => {});
    expect(statusCode).to.equal(400);
    expect(message).to.equal("Nothing Selected");
  });


  it("should return 404 if note not found", async () => {
    let statusCode, message;
    const fakeNoteId = new mongoose.Types.ObjectId();

    const req = {
      body: { noteID: fakeNoteId, title: "New Title" },
      user: { id: userId },
    };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await updateNote(req, res, () => {});
    expect(statusCode).to.equal(404);
    expect(message).to.equal("Note not found");
  });

  it("should return 200 when updated successfully", async () => {
    let statusCode, message;
    const req = {
      body: {
        noteID: note._id,
        title: "Updated Title",
        color: "red",
      },
      user: { id: userId },
    };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await updateNote(req, res, () => {});
    expect(statusCode).to.equal(200);
    expect(message).to.equal("Updated successfully");
  });
});

describe("getSingleNote", () => {
  let note;

  before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testNoteDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    note = await Notes.create({
      title: "Test Note",
      content: "Testing content",
      color: "red",
      user: new mongoose.Types.ObjectId(),
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });


  it("should return 400 for invalid note ID", async () => {
    let statusCode, message;
    const req = { body: { noteID: "invalid-id" } };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
      },
    };

    await getSingleNote(req, res, () => {});
    expect(statusCode).to.equal(400);
    expect(message).to.equal("Invalid note Id");
  });


  it("should return 200 and the note for valid note ID", async () => {
    let statusCode, data;
    const req = { body: { noteID: note._id } };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (resp) => {
        data = resp;
      },
    };

    await getSingleNote(req, res, () => {});
    expect(statusCode).to.equal(200);
    expect(data._id.toString()).to.equal(note._id.toString());
  });
});

