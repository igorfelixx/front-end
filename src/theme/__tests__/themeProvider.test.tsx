import { render, screen, fireEvent } from '@testing-library/react';
import { CustomThemeProvider } from '../themeProvider';
import { useThemeContext } from '../useThemeContext';

const TestComponent = () => {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <div>
      <div data-testid="theme-mode">{mode}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('CustomThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides light theme by default', () => {
    render(
      <CustomThemeProvider>
        <TestComponent />
      </CustomThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  it('toggles theme when toggle function is called', () => {
    render(
      <CustomThemeProvider>
        <TestComponent />
      </CustomThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  it('persists theme preference in localStorage', () => {
    render(
      <CustomThemeProvider>
        <TestComponent />
      </CustomThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('theme')).toBe('light');
  });
});