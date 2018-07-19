import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import { observer } from 'mobx-react';
import SongStore from './SongStore';

const  debounceEvent = (callback, time) => {
  let interval;
  return () => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;

      // eslint-disable-next-line
      callback(arguments);
    }, time);
  };
}

@observer
export default class SearchSong extends Component {

  debounceInput = debounceEvent((query) => { SongStore.getTrackList(query); }, 500);

  onTextInputChange = (value: string) => {
    this.query = value;
    this.debounceInput(value);
  }

  render() {
    return (
      <View style={{ marginVertical: 15 }}>
        <TextInput 
          style={{ color: 'gray', height: 20, fontSize: 18 }}
          value={this.query}
          onChangeText={(value) => { this.onTextInputChange(value); }}
          placeholder="Search..."
        />
        {SongStore.tracks && (
          <FlatList
            data={SongStore.tracks}
            keyExtractor={(_, i) => i}
            renderItem={({ item }) => (
              <ListItem
                imageUrl={item.album.images[0].url && item.album.images[0].url}
                songName={item.name}
              />
            )}
          />
        )}
      </View>
    );
  }
}