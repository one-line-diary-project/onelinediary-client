import { act, render, screen } from "../test/utils/testUtil";
import New from "./New";

const mockdata = {
  _id: "6524ebda80a947ce3eb48d47",
  contents: [
    {
      content: "테스트 1 ",
      postTime: "PM 3:14",
      _id: "6524ebda80a947ce3eb48d48",
    },
    {
      content: "테스트 2",
      postTime: "PM 8:03",
      _id: "65252f76011b3e2ebd519008",
    },
  ],
  createdAt: "2023-10-10 15:14:50",
  author: "1696918490004",
};
describe("new", () => {
  it("render diary ", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockdata),
      })
    );
    await act(async () => {
      render(<New />);
    });

    const diaryItemElement = await screen.findAllByRole("article");
    expect(diaryItemElement).toHaveLength(2);

    global.fetch.mockRestore();
  });
});
