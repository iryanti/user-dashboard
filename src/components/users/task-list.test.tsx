import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "./task-list";

describe("TaskList", () => {
  it("renders todos", () => {
    render(
      <TaskList
        todos={[
          {
            id: 1,
            userId: 1,
            title: "Finish report",
            completed: true,
          },
        ]}
      />
    );

    expect(screen.getByText("Finish report")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders pending status", () => {
    render(
      <TaskList
        todos={[
          {
            id: 1,
            userId: 1,
            title: "Review UI",
            completed: false,
          },
        ]}
      />
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("shows more todos", async () => {
    render(
      <TaskList
        todos={Array.from({ length: 6 }, (_, index) => ({
          id: index,
          userId: 1,
          title: `Task ${index}`,
          completed: false,
        }))}
      />
    );

    expect(screen.getByText("Show more")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Show more"));
    expect(screen.getByText("Show less")).toBeInTheDocument();
  });
});
