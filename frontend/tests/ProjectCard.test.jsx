import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "../src/components/ProjectCard.jsx";

const project = { _id: "1", name: "Dashboard", description: "Un proyecto de prueba" };

describe("ProjectCard", () => {
  it("renderiza nombre y descripción", () => {
    render(<ProjectCard project={project} onOpen={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Un proyecto de prueba")).toBeInTheDocument();
  });

  it("llama a onOpen al hacer click en Abrir", () => {
    const onOpen = vi.fn();
    render(<ProjectCard project={project} onOpen={onOpen} onEdit={() => {}} onDelete={() => {}} />);
    fireEvent.click(screen.getByText("Abrir"));
    expect(onOpen).toHaveBeenCalledWith(project);
  });
});
