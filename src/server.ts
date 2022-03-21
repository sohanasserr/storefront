import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoute from './handlers/2productRoutes';
import userRoute from './handlers/1userRoutes';
import orderRoute from './handlers/3orderRoutes';
const app: express.Application = express();

const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
productRoute(app);
userRoute(app);
orderRoute(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
