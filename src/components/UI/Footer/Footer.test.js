import { render } from "../../../test/utils/testUtil";
import Footer from "../Footer/Footer";

describe("Footer components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<Footer />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
});
