import { render, screen, fireEvent } from '@testing-library/react';
import Track from './Track';

test('renders track name, artist, and album', () => {
  const track = { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' };
  render(<Track track={track} />);
  const nameElement = screen.getByText(/Track 1/i);
  const artistElement = screen.getByText(/Artist 1/i);
  const albumElement = screen.getByText(/Album 1/i);
  expect(nameElement).toBeInTheDocument();
  expect(artistElement).toBeInTheDocument();
  expect(albumElement).toBeInTheDocument();
});

test('calls onRemove function when remove button is clicked', () => {
  const track = { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' };
  const mockOnRemove = jest.fn();
  render(<Track track={track} onRemove={mockOnRemove} />);
  const removeButton = screen.getByText(/-/i);
  fireEvent.click(removeButton);
  expect(mockOnRemove).toHaveBeenCalledWith(track);
});