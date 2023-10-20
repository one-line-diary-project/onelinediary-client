import { render } from "../../test/utils/testUtil";
import NoneDiary from "./NoneDiary";

describe("NoneDiary components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<NoneDiary />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
});
