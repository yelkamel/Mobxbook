import React, { Component } from 'react';
import {
  Button
} from 'react-native';
import { observer } from 'mobx-react';

import BookStore from './BookStore';
import MangaStore from './MangaStore';

type Props = {
  item: PropTypes.object.isRequired,
  isBook: PropTypes.bool.isRequired,
};


@observer
class DeleteBookButton extends Component<Props> {
  delete = () => {
    if (this.props.isBook) {
      BookStore.removeBook(this.props.item)
    } else {
      MangaStore.removeManga(this.props.item)
    }
  }

  render() {

    return (
      <Button onPress={this.delete} title='X' />
    );
  }
}


export default DeleteBookButton