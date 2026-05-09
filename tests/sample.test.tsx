import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function SampleComponent() {
  return <h1>Testing setup works</h1>;
}

describe("testing setup", () => {
  it("renders a sample component", () => {
    render(<SampleComponent />);

    expect(
      screen.getByRole("heading", { name: "Testing setup works" }),
    ).toBeInTheDocument();
  });
});
