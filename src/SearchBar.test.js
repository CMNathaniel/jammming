import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders search input and button', () => {
  render(<SearchBar />);
  const searchInput = screen.getByPlaceholderText('Search for songs');
  const searchButton = screen.getByText('Search');
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('updates term state when input value changes', () => {
  render(<SearchBar />);
  const searchInput = screen.getByPlaceholderText('Search for songs');
  fireEvent.change(searchInput, { target: { value: 'test' } });
  const updatedInput = screen.getByDisplayValue('test');
  expect(updatedInput).toBeInTheDocument();
});

test('calls onSearch prop with the correct term when search button is clicked', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);
  const searchInput = screen.getByPlaceholderText('Search for songs');
  const searchButton = screen.getByText('Search');
  fireEvent.change(searchInput, { target: { value: 'test' } });
  fireEvent.click(searchButton);
  expect(mockOnSearch).toHaveBeenCalledWith('test');
});