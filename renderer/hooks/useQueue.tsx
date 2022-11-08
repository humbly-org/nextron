import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context';

export const useQueue = () => {
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('queueMessage', (message) => {
      setMessage(message);
      console.log('queueMessage', message);
    });
  }, []);

  return { message };
};
