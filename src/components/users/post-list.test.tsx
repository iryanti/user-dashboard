import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import PostList from "./post-list";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockedUseQuery = useQuery as jest.Mock;

describe("PostList", () => {
  it("renders posts", () => {
    mockedUseQuery.mockReturnValue({
      data: [
        {
          id: 1,
          title: "First Post",
        },
      ],
      isLoading: false,
      isError: false,
    });

    render(
      <PostList userId="1" />,
    );

    expect(
      screen.getByText("First Post"),
    ).toBeInTheDocument();
  });

  it("renders empty state", () => {
    mockedUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(
      <PostList userId="1" />,
    );

    expect(
      screen.getByText(
        /no posts found/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(
      <PostList userId="1" />,
    );

    expect(
      screen.getByText(
        /failed to load posts/i,
      ),
    ).toBeInTheDocument();
  });
});