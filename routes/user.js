import router from 'express'
import {listUsers, getUser,addUserUrl,addUser, modifyUser,deleteUser} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'
import { timeOfRequest } from '../middlewares/time.js'

const routerExpress = router()
routerExpress.get('/', listUsers)
routerExpress.get('/addurl', addUserUrl)
routerExpress.post('/adduser', addUser)
routerExpress.post('/updateuser/:id', modifyUser)
routerExpress.delete('/delete/:id', deleteUser)
routerExpress.get('/id/:id', auth, timeOfRequest, getUser)



export default routerExpress
