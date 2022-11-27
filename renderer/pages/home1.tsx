import { Button, Input } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context';
import { parseMessage } from '../utils/types';

export const Home = () => {
  const [input, setInput] = useState('');
  const socket = useContext(SocketContext);

  const handleSendMessage = () => {
    const message = {
      message: input,
    };
    socket.sendMessage(JSON.stringify(message));
  };

  return (
    <div>
      <Input onChange={(e) => setInput(e.target.value)}></Input>
      <Button onClick={() => handleSendMessage()}>Send</Button>
    </div>
  );
};

export default Home;
