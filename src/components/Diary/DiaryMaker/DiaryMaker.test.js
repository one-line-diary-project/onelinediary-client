import { render, screen } from "../../../test/utils/testUtil";
import DiaryMaker from "./DiaryMaker";

const mockdata = {
  _id: "a1234",
  createdAt: "2023.10.10",
  contents: [
    {
      _id: "b1234",
      content: "diaryMaker Test1",
      postTime: "PM 3:14",
    },
  ],
};
describe("DiaryMaker components", () => {
  let tree;
  beforeEach(() => {
    tree = render(<DiaryMaker key={"1"} {...mockdata} />);
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
  it("resnders diary content", () => {
    const diaryTitleElement = screen.getByText("2023.10.10");
    expect(diaryTitleElement).toBeInTheDocument();

    const diaryItemElement = screen.getByText("diaryMaker Test1");
    expect(diaryItemElement).toBeInTheDocument();
  });
});
