import { Socket as IOSocket } from 'socket.io';

export interface SocketData {
  gameCode?: string;
}

export interface ISocket extends IOSocket {
  data: SocketData;
}
