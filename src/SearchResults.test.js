import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults from './SearchResults';

test('renders search results', () => {
  const searchResults = [
    { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
    { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  ];
  render(<SearchResults searchResults={searchResults} />);
  
  // Assert that the track names are rendered
  expect(screen.getByText('Track 1')).toBeInTheDocument();
  expect(screen.getByText('Track 2')).toBeInTheDocument();
  
  // Assert that the artist and album names are rendered
  expect(screen.getByText('Artist 1 | Album 1')).toBeInTheDocument();
  expect(screen.getByText('Artist 2 | Album 2')).toBeInTheDocument();
});

test('calls onAdd when the add button is clicked', () => {
  const searchResults = [
    { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  ];
  const onAddMock = jest.fn();
  render(<SearchResults searchResults={searchResults} onAdd={onAddMock} />);
  
  // Simulate clicking the add button
  fireEvent.click(screen.getByText('+'));
  
  // Assert that onAdd is called with the correct track
  expect(onAddMock).toHaveBeenCalledWith(searchResults[0]);
});