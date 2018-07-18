/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button, 
  TextInput} from 'react-native';
import {enableLogging} from 'mobx-logger';

import { observer } from 'mobx-react';
import BookStore from './BookStore';

const config = {
  action: true,
  predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
  reaction: false,
  transaction: false,
  compute: false
};

enableLogging(config);

const initialState = {
  title: '',
  author: ''
}

@observer 
class App extends Component {
  state = initialState

  onChangeText(key, value ) {
    this.setState({
      [key]: value
    })
  }

  addBook = () => {
    if (this.state.title !== '' &&  this.state.author !== '') {
      BookStore.addBook(this.state)
      this.setState(initialState)
    }
  }

  delete (book) {
    BookStore.removeBook(book)
  }

  toggleRead(book){
    book.toggleRead()
  }

  render() {
    const { books } = BookStore

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Book Management</Text>

        <Text style={styles.instructions}>with Mobx</Text>
        <View style={styles.subcontainer}>

        {
          books.map((book, index) => (
          <View style={styles.flexColumn} key={index}>
            <Text style={styles.text}>{book.title} {book.author}</Text>
            <Text style={styles.text} onPress={() => this.toggleRead(book)}>{book.read ? ' yes ' : ' no '}</Text>
            <Text style={styles.text} onPress={() => this.delete(book)}>X</Text>
          </View>))
        }
        </View>
        <View style={styles.addsection}>
          <TextInput
            value={this.state.title}
            style={styles.input}
            onChangeText={value => this.onChangeText('title', value)}
            placeholder={"Title"}
          />
          <TextInput
            value={this.state.author}
            style={styles.input}
            onChangeText={value => this.onChangeText('author', value)}
            placeholder={"Author"}
          />
          <Button onPress={this.addBook} title='ADD' />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 5,
    width: 140,
    backgroundColor: '#F5F5F5',
    margin: 5,
  },
  text:{
    margin: 5,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9E9E9E',
  },
  subcontainer: {
    flex:1,
    margin: 5,
  },
  flexColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  addsection : {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
});
export default App