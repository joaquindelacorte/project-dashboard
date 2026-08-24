import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const loginMock = vi.fn();

vi.mock("../src/context/AuthContext.jsx", () => ({
  useAuth: () => ({ login: loginMock }),
}));

const { default: Login } = await import("../src/pages/Login.jsx");

describe("Login", () => {
  it("renderiza el formulario con campos de email y contraseña", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  });

  it("llama a login con los valores ingresados al enviar", async () => {
    loginMock.mockResolvedValueOnce(undefined);
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "joaco@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByText("Entrar"));
    expect(loginMock).toHaveBeenCalledWith("joaco@example.com", "secret123");
  });
});
