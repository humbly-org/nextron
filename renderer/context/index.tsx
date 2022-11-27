import { createContext } from 'react';
import { SocketStore } from '../store/SocketStore';

export const SocketContext = createContext<SocketStore>(null);
