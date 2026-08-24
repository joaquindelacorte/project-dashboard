import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../src/components/TaskCard.jsx";

const task = { _id: "1", title: "Diseñar UI", description: "Wireframes", priority: "high" };

describe("TaskCard", () => {
  it("renderiza título y prioridad", () => {
    render(<TaskCard task={task} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Diseñar UI")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  it("llama a onDelete al hacer click en Eliminar", () => {
    const onDelete = vi.fn();
    render(<TaskCard task={task} onEdit={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getByText("Eliminar"));
    expect(onDelete).toHaveBeenCalledWith(task);
  });
});
