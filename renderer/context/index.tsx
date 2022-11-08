import socketio from 'socket.io-client';
import { SOCKET_URL } from './constant';
import { createContext } from 'react';
import net from 'net';

export const socket = net.connect({ host: 'localhost', port: 3334 });
export const SocketContext = createContext(null);
