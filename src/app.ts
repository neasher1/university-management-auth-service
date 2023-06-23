import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servers is running.........');
});

// app.get('/', async (req: Request, res: Response) => {
//   // throw new Error('Testing Error logger')
//   console.log(x)
// })

//global error handler
app.use(globalErrorHandler);

export default app;
