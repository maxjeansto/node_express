import router from 'express'
import  book  from './book.js'
import user  from './user.js'

const routerExpress = router()
routerExpress.use('/book', book)
routerExpress.use('/user', user)

export default routerExpress
 