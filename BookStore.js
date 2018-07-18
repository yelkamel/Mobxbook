import { types, destroy } from 'mobx-state-tree'
import { filter } from 'rsvp';

const Book = types.model('Book', {
  title: types.string,
  author: types.string,
  read: false
})
.actions(self => ({
  toggleRead() {
    self.read = !self.read
  }
}))

const BookStore = types.model('Books', {
  books: types.array(Book)
})
.views(self => ({
  get readBooks() {
    return selft.book.filter(book => book.read)
  },
  bookByAuthor(author) {
    return selft.books.filter(book => book.author === author)
  }
}))
.actions(self => ({
  addBook(book) {
    self.books.push(book)
  },
  removeBook (book) {
    destroy(book)
  }
}))
.create({
  books: [{ title: 'Mob Psycho ', author: '100', read : true}]
})

export default BookStore