import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './src/web';
import { handleConnection } from './src/socket';

function startServer() {
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  
  io.on('connection', handleConnection);

  const port = process.env.PORT ?? 5001;

  const server = httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
