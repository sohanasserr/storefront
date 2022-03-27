import http from 'http';
import express, { Request, Response } from 'express';
import productRoute from './handlers/productRoutes';
import userRoute from './handlers/userRoutes';
import orderRoute from './handlers/orderRoutes';

const app = express();

const address = '0.0.0.0:3000';
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
productRoute(app);
userRoute(app);
orderRoute(app);


const httpApp = http.createServer(app).listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default httpApp;