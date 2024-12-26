import { render, screen, fireEvent } from '@testing-library/react';
import DrawerMenu from '../DrawerMenu';
import { ThemeContext } from '../../../theme/themeContext';

describe('DrawerMenu Component', () => {
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
    onClose: jest.fn(),
  };

  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: jest.fn(),
  };

  it('renders correctly', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <DrawerMenu {...mockProps} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows loading skeletons when loading is true', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <DrawerMenu {...{ ...mockProps, loading: true }} />
      </ThemeContext.Provider>
    );

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('calls onSelectCall and onClose when a call is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <DrawerMenu {...mockProps} />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(mockProps.onSelectCall).toHaveBeenCalledWith(mockProps.messages[0]);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});