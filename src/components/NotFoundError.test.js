import { render } from "../test/utils/testUtil";
import NotFoundError from "./NotFoundError";

describe("NotFoundError components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<NotFoundError />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
});
