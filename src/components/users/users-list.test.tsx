import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import UsersList from "./users-list";
import userEvent from "@testing-library/user-event";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),

  useSearchParams: () => ({
    get: () => "",
  }),
}));

const mockedUseQuery = useQuery as jest.Mock;

describe("UsersList", () => {
  it("renders loading state", () => {
    mockedUseQuery.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(<UsersList />);

    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    mockedUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<UsersList />);

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("filters users by search", async () => {
    mockedUseQuery
      .mockReturnValueOnce({
        data: [
          {
            id: 1,
            name: "John Doe",
            email: "john@test.com",
            website: "john.com",
            totalPosts: 5,
            completedTodos: 3,
            pendingTodos: 2,
          },
        ],
        isLoading: false,
        isError: false,
      })

      .mockReturnValueOnce({
        data: [],
        isLoading: false,
        isError: false,
      })

      .mockReturnValueOnce({
        data: [],
        isLoading: false,
        isError: false,
      });

    render(<UsersList />);

    const input = screen.getByPlaceholderText("Search users...");

    await userEvent.type(input, "john");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
