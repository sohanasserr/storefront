import express, { Request, Response } from 'express';
import productRoute from './handlers/productRoutes';
import userRoute from './handlers/userRoutes';
import orderRoute from './handlers/orderRoutes';
import { DashboardRoute } from './services/dashboard';

const app = express();

const address = '0.0.0.0:3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


productRoute(app);
userRoute(app);
orderRoute(app);
DashboardRoute(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;