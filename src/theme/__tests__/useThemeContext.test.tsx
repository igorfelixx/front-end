import { renderHook } from '@testing-library/react';
import { useThemeContext } from '../useThemeContext';
import { ThemeContext } from '../themeContext';

describe('useThemeContext Hook', () => {
  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: jest.fn(),
  };

  it('returns theme context when used within provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockThemeContext}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useThemeContext(), { wrapper });

    expect(result.current.mode).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('throws error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useThemeContext());
    }).toThrowError('useThemeContext deve ser usado dentro do CustomThemeProvider.');

    consoleError.mockRestore();
  });
});