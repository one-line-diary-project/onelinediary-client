import { render, screen } from "../../../test/utils/testUtil";
import DiaryList from "./DiaryList";

const mockdata = [
  {
    _id: "b1234",
    content: "diaryMaker Test1",
    postTime: "PM 3:14",
  },
];

describe("DiaryList components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<DiaryList contents={mockdata} />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
  it("resnders diaryItem ", () => {
    const diaryItemElement = screen.getByText("diaryMaker Test1");
    expect(diaryItemElement).toBeInTheDocument();
  });
});
