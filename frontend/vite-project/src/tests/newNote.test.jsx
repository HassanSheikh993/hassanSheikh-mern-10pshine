import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateNewNote } from "../components/notes/newNote";

test("renders new note form", () => {
  render(
    <BrowserRouter>
      <CreateNewNote />
    </BrowserRouter>
  );


  expect(screen.getByText("Create A New Note")).toBeInTheDocument();


  const titleInput = screen.getAllByRole("textbox")[0];
  expect(titleInput).toBeInTheDocument();

 
  const contentEditor = screen.getAllByRole("textbox")[1];
  expect(contentEditor).toBeInTheDocument();


  expect(screen.getByDisplayValue("Create Note")).toBeInTheDocument();
});
