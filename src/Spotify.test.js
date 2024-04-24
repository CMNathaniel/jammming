import Spotify from './Spotify';

describe('Spotify', () => {
  describe('getAccessToken', () => {
    it('should return the access token if it exists', () => {
      // Mock the access token
      const accessToken = 'mockAccessToken';
      Spotify.accessToken = accessToken;

      // Call the method
      const result = Spotify.getAccessToken();

      // Assert the result
      expect(result).toEqual(Promise.resolve(accessToken));
    });

    it('should retrieve the access token from the URL hash', () => {
      // Mock the URL hash
      const hash = '#access_token=mockAccessToken&expires_in=3600';
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost/${hash}`,
          hash: hash,
        },
        writable: true,
      });

      // Call the method
      const result = Spotify.getAccessToken();

      // Assert the result
      expect(result).toEqual(Promise.resolve('mockAccessToken'));
    });

    it('should redirect to the Spotify authorization URL if the access token does not exist', () => {
      // Mock the Spotify authorization URL
      const authUrl = 'https://accounts.spotify.com/authorize?client_id=mockClientId&response_type=token&scope=playlist-modify-public&redirect_uri=mockRedirectUri';
      window.location = authUrl;

      // Call the method
      const result = Spotify.getAccessToken();

      // Assert the result
      expect(result).toEqual(new Promise((resolve, reject) => {
        window.addEventListener('hashchange', () => {
          resolve('mockAccessToken');
        });
      }));
    });
  });

  describe('search', () => {
    it('should return an array of tracks when given a search term', () => {
      // Mock the fetch response
      const mockResponse = {
        tracks: {
          items: [
            {
              id: '1',
              name: 'Track 1',
              artists: [{ name: 'Artist 1' }],
              album: { name: 'Album 1' },
              uri: 'spotify:track:1',
            },
            {
              id: '2',
              name: 'Track 2',
              artists: [{ name: 'Artist 2' }],
              album: { name: 'Album 2' },
              uri: 'spotify:track:2',
            },
          ],
        },
      };
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      // Call the method
      const result = Spotify.search('test');

      // Assert the result
      expect(result).resolves.toEqual([
        {
          id: '1',
          name: 'Track 1',
          artist: 'Artist 1',
          album: 'Album 1',
          uri: 'spotify:track:1',
        },
        {
          id: '2',
          name: 'Track 2',
          artist: 'Artist 2',
          album: 'Album 2',
          uri: 'spotify:track:2',
        },
      ]);
    });

    it('should return an empty array if no tracks are found', () => {
      // Mock the fetch response
      const mockResponse = {
        tracks: null,
      };
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      // Call the method
      const result = Spotify.search('test');

      // Assert the result
      expect(result).resolves.toEqual([]);
    });
  });

  describe('savePlaylist', () => {
    it('should save the playlist with the given name and track URIs', () => {
      // Mock the fetch response
      const mockResponse = {
        id: 'mockPlaylistId',
      };
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      // Call the method
      const result = Spotify.savePlaylist('New Playlist', ['spotify:track:1', 'spotify:track:2']);

      // Assert the result
      expect(result).resolves.toBeUndefined();
    });

    it('should not save the playlist if the name or track URIs are missing', () => {
      // Call the method without a name or track URIs
      const result = Spotify.savePlaylist('', []);

      // Assert the result
      expect(result).toBeUndefined();
    });
  });
});