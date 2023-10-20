import userEvent from "@testing-library/user-event";
import { act, render, screen } from "../../../test/utils/testUtil";
import Header from "./Header";

afterEach(() => {
  jest.clearAllMocks();
});
describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders Header", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders Menu", () => {
    const listItem = screen.getAllByRole("listitem");
    expect(listItem).not.toBeNull();
  });

  it("change theme if the changeTheme button was clicked", () => {
    const toggle = screen.queryByTestId("changeTheme");
    const lighTheme = screen.getByAltText("light-theme");
    expect(lighTheme).not.toBeNull();

    act(() => {
      userEvent.click(toggle);
    });
    const darkTheme = screen.getByAltText("dark-theme");
    expect(darkTheme).not.toBeNull();
  });
});
