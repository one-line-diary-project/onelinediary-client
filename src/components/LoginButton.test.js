import userEvent from "@testing-library/user-event";
import { render, screen } from "../test/utils/testUtil";
import LoginButton from "./LoginButton";

const { location } = window;

beforeAll(() => {
  delete window.location;
  window.location = {};
});

describe("LoginButton components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<LoginButton />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });

  it("renders login Button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(window.location.href).toBeDefined();
  });
});

afterAll(() => {
  window.location = location;
});
