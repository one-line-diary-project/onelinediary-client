import { render } from "../test/utils/testUtil";
import Header from "./Header";

describe("Header components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<Header />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
});
