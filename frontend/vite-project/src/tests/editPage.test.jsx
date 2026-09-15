import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { EditNote } from "../components/notes/editPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: {
        notes: {
          _id: "1",
          title: "Test Note",
          content: "This is a test note.",
          color: "#FEC971",
        },
      },
    }),
  };
});

test("renders edit note form", () => {
  render(
    <BrowserRouter>
      <EditNote />
    </BrowserRouter>
  );

  expect(screen.getByText("Edit Note")).toBeInTheDocument();

  expect(screen.getByDisplayValue("Test Note")).toBeInTheDocument();

  const editor = screen.getAllByRole("textbox")[0];
  expect(editor).toBeInTheDocument();

  expect(screen.getByDisplayValue("Update Note")).toBeInTheDocument();
});
