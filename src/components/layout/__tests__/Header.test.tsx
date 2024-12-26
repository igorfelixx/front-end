import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { ThemeContext } from '../../../theme/themeContext';

describe('Header Component', () => {
  const mockProps = {
    formDataName: 'Test User',
    onToggleDrawer: jest.fn(),
    onDisconnect: jest.fn(),
  };

  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: jest.fn(),
  };

  it('renders correctly', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Header {...mockProps} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('calls onToggleDrawer when menu button is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Header {...mockProps} />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByLabelText('menu'));
    expect(mockProps.onToggleDrawer).toHaveBeenCalled();
  });

  it('calls onDisconnect when logout button is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Header {...mockProps} />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('Sair'));
    expect(mockProps.onDisconnect).toHaveBeenCalled();
  });
});