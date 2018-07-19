import React, { Component } from 'react';
import {
  Button
} from 'react-native';
import { observer } from 'mobx-react';

import BookStore from './BookStore';

type Props = {
  book: PropTypes.object.isRequired
};


@observer
class DeleteBookButton extends Component<Props> {
  delete = () => {
    BookStore.removeBook(this.props.book)
  }

  render() {

    return (
      <Button onPress={this.delete} title='X' />
    );
  }
}


export default DeleteBookButton