import express from 'express';
import cors from 'cors';
import { getStringfiedBus } from './helper';

const app = express();

app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => { 
  res.redirect('/client');
});

app.get('/client(/*)?', (req: express.Request, res: express.Response) => {
  res.sendFile('client/public/index.html', { root: __dirname + '/..' } );
});

app.get('/api/get-bus', (req: express.Request, res: express.Response) => {
  res.send(getStringfiedBus());
});

app.use(express.static('client/public'));

export { 
  app 
};