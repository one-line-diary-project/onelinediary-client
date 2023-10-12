import { act, render, screen } from "../test/utils/testUtil";
import Diary from "./Diary";
import userEvent from "@testing-library/user-event";

const mockdata = [
  {
    _id: "652805f8ec3efb171751c30c",
    contents: [
      {
        content: "테스트",
        postTime: "PM 11:43",
        _id: "652805f8ec3efb171751c30d",
      },
    ],
    createdAt: "2023-10-12 23:43:04",
    author: "1696918490004",
    __v: 0,
  },
  {
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
    __v: 0,
  },
];
describe("diary", () => {
  it("render diary list", async () => {
    act(() => {
      render(<Diary />);
    });

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockdata),
      })
    );
    const searchBtn = screen.getByTestId("seacrhBtn");
    await act(async () => {
      userEvent.click(searchBtn);
    });

    const diaryItemElement = await screen.findAllByRole("article");
    expect(diaryItemElement).not.toHaveLength(0);

    global.fetch.mockRestore();
  });
});
