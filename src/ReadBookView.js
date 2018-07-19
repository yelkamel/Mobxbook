import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';

import BookStore from './BookStore';

type Props = {
};


@observer
class ReadBookView extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      {
        BookStore.readBooks.map((books,index) => {
            return (<Text key={index}>{books.title}</Text>)
        })
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#607D8B',
    margin: 10,
    borderRadius: 10,
  },
})

export default ReadBookView