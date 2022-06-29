import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Question from "./Question";

afterEach(cleanup);

test("render question component", () => {
  render(<Question />);
  expect(
    screen.getByText("Create Fill In The Blanks Question")
  ).toBeInTheDocument();
});