import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { NotesHome } from "../components/notes/notesHome";

vi.mock("../services/notesServices", () => ({
  getNotesByUser: vi.fn(() =>
    Promise.resolve([
      {
        _id: "1",
        title: "Test Note",
        content: "<p>This is a note</p>",
        color: "#FEC971",
        createdAt: new Date().toISOString(),
      },
    ])
  ),
  searchNotes: vi.fn(() => Promise.resolve({ notes: [] })),
  deleteNote: vi.fn(() => Promise.resolve({ message: "Note deleted" })),
}));

test("renders NotesHome component correctly", async () => {
  render(
    <BrowserRouter>
      <NotesHome />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();

  const noteTitle = await screen.findByText("Test Note");
  expect(noteTitle).toBeInTheDocument();
});

test("shows 'No matching notes found' when search returns empty", async () => {
  render(
    <BrowserRouter>
      <NotesHome />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText("Search...");
  fireEvent.change(input, { target: { value: "random" } });
  const searchButton = screen.getByRole("button", { name: /Search/i });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText("No matching notes found")).toBeInTheDocument();
  });
});
