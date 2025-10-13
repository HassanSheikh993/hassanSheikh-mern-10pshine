
import { expect } from "chai";
import {registerUser,loginUser,logoutUser} from "../controllers/authController.js"
import mongoose from "mongoose";
import { User } from "../models/user.js";

describe("registerUser", ()=>{
      before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      await User.create({
      name: "Test User",
      email: "test@abc.com",
      password: "12345678",
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
    
    it("should return 400 if data is incomplete",async()=>{
        let statusCode;
        let message;
        const req = {body:{name:"Test"}};
        const res = {
            status: (code) => {
                statusCode = code;
                return res;
            },
            json: (data) => {
                message = data.message;
            }
            }

        await registerUser(req, res, () => {});

        expect(statusCode).to.equal(400);
        expect(message).to.equal("Incomplete data");
    })


    it("should return 400 if User Exists With This Email",async()=>{
         let statusCode,message;
        const req = {body:{name:"Test",email:"test@abc.com",password:"12345678"}};
        const res = {
            status:(code)=>{
                statusCode=code;
                return res;
            },

            json:(data)=>{
                message= data.message
            }
        }

        await registerUser(req,res,()=>{});
        expect(statusCode).to.equal(400);
        expect(message).to.equal("User Exists With This Email");
    })


    it("should return 201 for creating a new account",async()=>{
        let statusCode,message;
        const req = {body:{name:"Test",email:"test@gmail.com",password:"12345678"}};
        const res = {
            status:(code)=>{
                statusCode=code;
                return res;
            },

            json:(data)=>{
                message= data.message
            }
        }

        await registerUser(req,res,()=>{});
        expect(statusCode).to.equal(201);
        expect(message).to.equal("Account Created");
    })

})


describe("loginUser",()=>{

before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.create({
      name: "Test User",
      email: "test@abc.com",
      password: "12345678",
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

    it("should return 400 error is data is Incomplete",async()=>{
       let statusCode,message;
       const req = {body:{email:"abc@gmail.com"}};
       const res = {
        status:(code)=>{
            statusCode=code;
            return res
        },
        json:(data)=>{
            message=data.message;
        }
       }

       await loginUser(req,res,()=>{});

       expect(statusCode).to.equal(400);
       expect(message).to.equal("Incomplete Data");
    })

    it("should return 404 if user not found",async()=>{
        let statusCode,message;
        let req = {body:{email:"notExist@abc.com",password:"12345678"}};
        let res = {
            status:(code)=>{
                statusCode = code;
                return res;
            },
            json:(data)=>{
                message = data.message;
            }
        }

        await loginUser(req,res,()=>{});

        expect(statusCode).to.equal(404);
        expect(message).to.equal("User Not Exist");
    })


    it("should return 401 if Incorrect Password",async()=>{
        let statusCode,message;
        let req = {body:{email:"test@abc.com",password:"11223344"}};
        let res = {
            status:(code)=>{
                statusCode = code;
                return res;
            },
            json:(data)=>{
                message = data.message;
            }
        }

        await loginUser(req,res,()=>{});

        expect(statusCode).to.equal(401);
        expect(message).to.equal("Incorrect Password");
    })

    it("should return success message and login user if credentials are correct",async()=>{
        let message;
        const req = {body:{email:"test@abc.com",password:"12345678"}};
        const res = {
             cookie: () => {},
            json:(data)=>{
                message = data.message
            }
        }

        await loginUser(req,res,()=>{});
        expect(message).to.equal("Login successful")
    })

})


describe("logoutUser", () => {
  it("should clear the token cookie and return success message", () => {
    let clearedCookie = "";
    let statusCode, message, status;

    const req = {};
    const res = {
      clearCookie: (cookieName, options) => {
        clearedCookie = cookieName;
      },
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        message = data.message;
        status = data.status;
      },
    };

    logoutUser(req, res, () => {});

    expect(clearedCookie).to.equal("token");
    expect(statusCode).to.equal(200);
    expect(message).to.equal("Logged out successfully");
    expect(status).to.equal(true);
  });
});