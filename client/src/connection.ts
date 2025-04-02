import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

export const socket = socketIOClient();
export const ConnectionContext = createContext(socket);
