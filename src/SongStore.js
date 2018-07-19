import { types, destroy } from 'mobx-state-tree'
import { Alert } from 'react-native';

const API_URL = 'https://api.spotify.com/v1/search';

const Song = types.model('Song', {
  track: types.string,
})
  .actions(self => ({

  }))


const SongStore = types.model('Songs', {
  songs: types.array(Song)
})
  .actions(self => ({
    async getTrackList(query) {
      if (!query) {
        this.tracks = [];
        return;
      }
      try {
        const requestURL = `${API_URL}?q=${query}&type=track&limit=10`;
        const response = await fetch(requestURL, { method: 'GET'});
        self.tracks = response.data.tracks.items;
      } catch (e) {
        Alert.alert('Connection error', 'Couldn\'t fetch the data.');
      }
    },
  }))
  .create({
    songs: []
  })


export default SongStore 
