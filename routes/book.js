import router from 'express'
import { getAllBooks, createBook, updateBook, deleteBook, getBook} from '../controllers/book.js'

const routerExpress = router()
routerExpress.get('/', getAllBooks)
routerExpress.post('/addbook', createBook)
routerExpress.put('/updatebook/:id', updateBook)
routerExpress.delete('/delete/:id', deleteBook)
routerExpress.get('/id/:id', getBook)

export default routerExpress