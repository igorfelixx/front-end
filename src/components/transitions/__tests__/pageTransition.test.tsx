import { render, screen, waitFor } from "@testing-library/react";
import PageTransition from "../pageTransition";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "../../../theme/themeContext";
import { act } from "react";

jest.useFakeTimers();

describe("PageTransition Component", () => {
  const mockThemeContext = {
    mode: "light" as const,
    toggleTheme: jest.fn(),
  };

  it("renders transition animation initially", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeContext.Provider value={mockThemeContext}>
                <PageTransition />
              </ThemeContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const letters = ["D", "I", "G", "I", "T", "R", "O"];
    letters.forEach((letter) => {
      const elements = screen.getAllByText(letter);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("removes transition after timeout", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeContext.Provider value={mockThemeContext}>
                <PageTransition />
              </ThemeContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      const letters = ["D", "I", "G", "I", "T", "R", "O"];
      letters.forEach((letter) => {
        const elements = screen.queryAllByText(letter);
        expect(elements.length).toBe(0);
      });
    });

    jest.useRealTimers();
  });
});