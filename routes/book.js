import router from 'express'
import { listBook, addBook, modifyBook, deleteBook, getBooks   } from '../controllers/book.js'

const routerExpress = router()
routerExpress.get('/', listBook)
routerExpress.post('/addbook', addBook)
routerExpress.post('/updatebook/:id', modifyBook)
routerExpress.delete('/delete/:id', deleteBook)
routerExpress.get('/id/:id', getBooks)

export default routerExpress