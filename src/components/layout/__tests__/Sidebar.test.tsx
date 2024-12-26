import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { ThemeContext } from '../../../theme/themeContext';
import '@testing-library/jest-dom/matchers';


describe('Sidebar Component', () => {
  const mockProps = {
    formDataName: 'Test User',
    loading: false,
    messages: [
      {
        callId: '1',
        caller: 'John Doe',
        media: 'audio',
        service: 'support',
        startDate: '2024-02-20',
      },
    ],
    selectedCallId: null,
    onSelectCall: jest.fn(),
    onDisconnect: jest.fn(),
  };

  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: jest.fn(),
  };

  it('renders correctly', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Sidebar {...mockProps} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Chamadas ativas (1)')).toBeInTheDocument();
  });

  it('shows loading skeletons when loading is true', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Sidebar {...{ ...mockProps, loading: true }} />
      </ThemeContext.Provider>
    );

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('calls onSelectCall when a call is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Sidebar {...mockProps} />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(mockProps.onSelectCall).toHaveBeenCalledWith(mockProps.messages[0]);
  });
});