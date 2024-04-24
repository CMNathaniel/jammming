import { render, screen } from '@testing-library/react';
import TrackList from './TrackList';

test('renders all tracks', () => {
  const tracks = [
    { id: '1', name: 'Track 1' },
    { id: '2', name: 'Track 2' },
    { id: '3', name: 'Track 3' },
  ];
  render(<TrackList tracks={tracks} />);
  
  const trackElements = screen.getAllByTestId('track');
  expect(trackElements.length).toBe(tracks.length);
});

test('calls onRemove when a track is removed', () => {
  const tracks = [
    { id: '1', name: 'Track 1' },
    { id: '2', name: 'Track 2' },
    { id: '3', name: 'Track 3' },
  ];
  const onRemove = jest.fn();
  render(<TrackList tracks={tracks} onRemove={onRemove} />);
  
  const removeButtons = screen.getAllByLabelText('Remove Track');
  fireEvent.click(removeButtons[0]);
  expect(onRemove).toHaveBeenCalledWith(tracks[0]);
});