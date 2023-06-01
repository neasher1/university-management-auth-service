import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRoute from './app/modules/users/users.route'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application Routes
app.use('/api/v1/users/', usersRoute.router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

export default app
