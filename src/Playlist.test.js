import { render, screen, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';

test('renders playlist name', () => {
  const playlistName = 'My Playlist';
  render(<Playlist playlistName={playlistName} />);
  const playlistNameElement = screen.getByText(playlistName);
  expect(playlistNameElement).toBeInTheDocument();
});

test('updates playlist name', () => {
  const playlistName = 'My Playlist';
  const newPlaylistName = 'New Playlist Name';
  const onNameChange = jest.fn();
  render(<Playlist playlistName={playlistName} onNameChange={onNameChange} />);
  const nameInput = screen.getByPlaceholderText('Enter playlist name');
  fireEvent.change(nameInput, { target: { value: newPlaylistName } });
  expect(onNameChange).toHaveBeenCalledWith(newPlaylistName);
});

test('renders playlist tracks', () => {
  const playlistName = 'My Playlist';
  const playlistTracks = [
    { id: '1', name: 'Track 1' },
    { id: '2', name: 'Track 2' },
    { id: '3', name: 'Track 3' },
  ];
  render(<Playlist playlistName={playlistName} playlistTracks={playlistTracks} />);
  const trackElements = screen.getAllByTestId('track');
  expect(trackElements.length).toBe(playlistTracks.length);
});

test('removes track from playlist', () => {
  const playlistName = 'My Playlist';
  const playlistTracks = [
    { id: '1', name: 'Track 1' },
    { id: '2', name: 'Track 2' },
    { id: '3', name: 'Track 3' },
  ];
  const onRemove = jest.fn();
  render(<Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={onRemove} />);
  const removeButtons = screen.getAllByLabelText('Remove Track');
  fireEvent.click(removeButtons[0]);
  expect(onRemove).toHaveBeenCalledWith(playlistTracks[0]);
});

test('saves playlist', () => {
  const playlistName = 'My Playlist';
  const onSave = jest.fn();
  render(<Playlist playlistName={playlistName} onSave={onSave} />);
  const saveButton = screen.getByLabelText('Save to Spotify');
  fireEvent.click(saveButton);
  expect(onSave).toHaveBeenCalled();
});