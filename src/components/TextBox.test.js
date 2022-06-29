import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import TextBox from "./TextBox";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("TextBox", () => {
    it("render textbox component", () => {
        render(<TextBox />);
        expect(
            screen.getByText("Create Fill In The Blanks Question")
        ).toBeInTheDocument();
    });
    
    it("test tolerance input field", () => {
        render(<TextBox />);
        const toleranceInput = screen.getByLabelText("Tolerance %");
        expect(toleranceInput).toBeInTheDocument();
        expect(toleranceInput).toHaveValue("");

        userEvent.type(toleranceInput, "10");
        expect(toleranceInput).toHaveValue("10");
    });

    it("test minutes and seconds input field", () => {
        render(<TextBox />);
        const minutes = screen.getByLabelText("Minutes");
        expect(minutes).toBeInTheDocument();
        expect(minutes).toHaveValue('00');
        userEvent.clear(minutes);
        userEvent.type(minutes, "10");
        expect(minutes).toHaveValue("10");

        const seconds = screen.getByLabelText("Seconds");
        expect(seconds).toBeInTheDocument();
        expect(seconds).toHaveValue('00');
        userEvent.clear(seconds);
        userEvent.type(seconds, "10");
        expect(seconds).toHaveValue("10");
    });

    it("test level of question input field", () => {
        render(<TextBox />);
        const easy = screen.getByLabelText("Easy");
        expect(easy).toBeInTheDocument();
        expect(easy).toBeChecked();

        const medium = screen.getByLabelText("Medium");
        expect(medium).toBeInTheDocument();
        expect(medium).not.toBeChecked();

        const hard = screen.getByLabelText("Hard");
        expect(hard).toBeInTheDocument();
        expect(hard).not.toBeChecked();
    });

    it("test marks input field", () => {
        render(<TextBox />);
        const marks = screen.getByLabelText("Marks out of 100");
        expect(marks).toBeInTheDocument();

        userEvent.type(marks, "70");
        expect(marks).toHaveValue(70);
    });
})