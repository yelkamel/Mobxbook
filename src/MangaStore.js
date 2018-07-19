import { types, destroy } from 'mobx-state-tree'
import { filter } from 'rsvp';

const Manga = types.model('manga', {
  title: types.string,
  author: types.string,
  read: false
})
  .actions(self => ({
    toggleRead() {
      self.read = !self.read
    }
  }))

const MangaStore = types.model('mangas', {
  mangas: types.array(Manga)
})
  .views(self => ({
    get readMangas() {
      return self.mangas.filter(manga => manga.read)
    },

  }))
  .actions(self => ({
    addManga(manga) {
      self.mangas.push(manga)
    },
    removeManga(manga) {
      destroy(manga)
    }
  }))
  .create({
    mangas: [{ title: 'Naruto', author: 'Ibuko', read: true }]
  })

export default MangaStore