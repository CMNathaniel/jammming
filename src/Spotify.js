const clientId = '321e877e722542feb5424e3a1a586202';
const redirectUri = 'http://localhost:3000/';

// Variables to store the access token and expiration time
let accessToken;
let expiresIn;

const Spotify = {
  // Method to get the access token
  getAccessToken() {
    if (accessToken) {
      return Promise.resolve(accessToken);
    }
  
    const url = new URL(window.location.href);
    const hash = url.hash.substring(1).split('&').reduce((initial, item) => {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  
    accessToken = hash.access_token;
    expiresIn = hash.expires_in;
  
    if (accessToken && expiresIn) {
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return Promise.resolve(accessToken);
    } else {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authUrl;
      return new Promise((resolve, reject) => {
        window.addEventListener('hashchange', () => {
          accessToken = url.hash.match(/access_token=([^&]*)/)[1];
          expiresIn = Number(url.hash.match(/expires_in=([^&]*)/)[1]);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          resolve(accessToken);
        });
      });
    }
  },

  // Method to search for tracks
  search(term) {
    return this.getAccessToken().then(accessToken => {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(response => response.json())
        .then(data => {
          if (!data.tracks) {
            return [];
          }
          return data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        });
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
  
    return this.getAccessToken().then(accessToken => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
  
      return fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(response => response.json())
        .then(data => {
          userId = data.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
          }).then(response => response.json())
            .then(data => {
              const playlistId = data.id;
              return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
              });
            });
        });
    });
  }
};

// Export the Spotify object
export default Spotify;