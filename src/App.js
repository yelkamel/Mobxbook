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

import DeleteBookButton from './DeleteBookButton';
import ReadBookView from './ReadBookView';

// ajouts du store
import BookStore from './BookStore';
import MangaStore from './MangaStore';


// logger configuration
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
  author: '',
}

@observer 
class App extends Component {
  state = {
    ...initialState,
    isBook: true,
  }

  onChangeText(key, value ) {
    this.setState({
      [key]: value
    })
  }

  addItem = () => {
    const { title, author, isBook} = this.state 
    if (title !== '' &&  author !== '') {

      if (isBook) {
        BookStore.addBook(this.state)
        this.setState({...initialState, isBook: true })
      } else {
        MangaStore.addManga(this.state)
        this.setState({ ...initialState, isBook: false })
      }

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
    const {mangas} = MangaStore

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Book Management</Text>

        <View style={styles.subcontainer}>
          <Text style={styles.instructions}>Livres</Text>

        {
          books.map((book, index) => (
          <View style={styles.flexColumn} key={index}>
            <Button style={styles.textYesNo} onPress={() => this.toggleRead(book)} title={book.read ? ' yes ' : ' no '} />
            <Text style={styles.bookText}>{book.title} {book.author}</Text>
            <DeleteBookButton item={book} isBook={true}/>
          </View>))
        }
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.instructions}>Mangas</Text>

          {
            mangas.map((manga, index) => (
              <View style={styles.flexColumn} key={index}>
                <Button style={styles.textYesNo} onPress={() => this.toggleRead(manga)} title={manga.read ? ' yes ' : ' no '} />
                <Text style={styles.bookText}>{manga.title} {manga.author}</Text>
                <DeleteBookButton item={manga} isBook={false} />
              </View>))
          }
        </View>
        <ReadBookView/>
        <View style={styles.addsection}>
          <Button onPress={() => this.setState(state => ({ ...state, isBook: !state.isBook }))} title={this.state.isBook ? 'Book' : 'Manga'} />

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

          <Button onPress={this.addItem} title='ADD' />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 2,
    width: 120,
    backgroundColor: '#F5F5F5',
    margin: 5,
  },
  textYesNo: {
    width: 50,
    margin: 5,
  },
  bookText:{
    width: 200,
    marginHorizontal: 20,
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
    justifyContent: 'flex-end',
    alignItems: 'center'
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