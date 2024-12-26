import { render, screen, fireEvent } from '@testing-library/react';
import CallDetails from '../CallDetails';
import { ThemeContext } from '../../../theme/themeContext';

describe('CallDetails Component', () => {
  const mockCall = {
    callId: '1',
    caller: 'John Doe',
    media: 'audio',
    service: 'support',
    startDate: '2024-02-20',
  };

  const mockProps = {
    selectedCall: mockCall,
    onEndCall: jest.fn(),
  };

  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: jest.fn(),
  };

  it('renders call details correctly', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CallDetails {...mockProps} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Call ID:/)).toBeInTheDocument();
    expect(screen.getByText(/Mídia:/)).toBeInTheDocument();
    expect(screen.getByText(/Serviço:/)).toBeInTheDocument();
    expect(screen.getByText(/Data inicial:/)).toBeInTheDocument();
  });

  it('calls onEndCall when end call button is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <CallDetails {...mockProps} />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('Finalizar Chamada'));
    expect(mockProps.onEndCall).toHaveBeenCalled();
  });
});