import router from 'express'
import {getAllUsers, getUser ,deleteUser, createUser, updateUser} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'
import { timeOfRequest } from '../middlewares/time.js'

const routerExpress = router()
routerExpress.get('/', getAllUsers)
routerExpress.get('/idnoauth/:id', getUser)
routerExpress.post('/adduser', createUser)
routerExpress.put('/updateuser/:id', updateUser)
routerExpress.delete('/delete/:id', deleteUser)
routerExpress.get('/id/:id', auth, timeOfRequest, getUser)



export default routerExpress
