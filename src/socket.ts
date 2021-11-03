import { Socket } from "socket.io";
import { Bus, BusBooleanChannels, BusNumberChannels } from "./typings";

const connected_sockets: {
  [id: string]: Socket
} = {};

let bus: Bus = {
  boolean: new Array(32).fill(false) as BusBooleanChannels,
  number: new Array(32).fill(0) as BusNumberChannels,
}

function handleConnection(socket: Socket) {
  console.log("New client connected");

  Object.values(connected_sockets).forEach(s => {
    s.disconnect();
  });

  connected_sockets[socket.id] = socket;

  socket.on('bus_update', (sent_bus: Bus) => {
    bus = sent_bus;
  })
};

export {
  handleConnection,
  bus
};