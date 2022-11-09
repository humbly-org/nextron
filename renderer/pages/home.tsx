import React, { useEffect, useId, useRef, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Card,
  Container,
  Input,
  Loading,
  Text,
} from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { atom, useAtom } from 'jotai';
import { useContext } from 'react';
import { SocketContext } from '../context';
//import { testAtom } from '../atom';

const messagesAtom = atom([]);
const loadingAtom = atom(false);

function Home() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const router = useRouter();

  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useAtom(messagesAtom);
  //const [test, setTest] = useAtom(testAtom);

  const messagesId = useId();

  useEffect(() => {
    socket.on('msgToClient', (message: string) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on('userLogin', (accepted: string) => {
      if (accepted) router.push('/next');
    });
  }, [socket]);

  const handleSendMessage = async () => {
    // router.push('/next');

    socket.write(emailRef.current.value, 'utf8', () => {
      socket.write("teste")
    });
    // const messageObject = {
    //   username: emailRef.current.value,
    //   password: passwordRef.current.value,
    // };
    // setTimeout(() => {
    //   socket.emit('userLogin', messageObject);
    //   setLoading(false);
    // }, 4000);
  };

  const handleCloseSocket = () => {
    console.log(socket);
    socket.destroy();
  };

  // console.log(loading);

  const handleOpenMonitor = () => {
    window.open(
      '/monitor',
      '_blank',
      'top=500, left=200,contextIsolation=no,nodeIntegration=yes',
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <Container
        css={{
          maxWidth: '100%',
          height: '100vh',
          width: '100%',
          backgroundColor: '$whiteee',
          margin: '0px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        display='flex'
        fluid>
        <Card
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mw: '400px',
            h: '500px',
            p: '$12',
            textAlign: 'center',
          }}>
          <Image width={64} height={64} src={'/images/dark.svg'}></Image>
          <Text weight={'bold'} size={'$lg'}>
            Humbly
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '10px',
            }}>
            <Input
              ref={emailRef}
              bordered
              width='200px'
              placeholder='Usuário'
            />
            <Input
              ref={passwordRef}
              bordered
              width='200px'
              type={'password'}
              placeholder='Senha'
            />
          </div>
          <Container
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            {messages.map((message, i) => (
              <Text key={`${messagesId}-${i}`}>{message}</Text>
            ))}
          </Container>
          <Button
            onClick={handleSendMessage}
            css={{
              w: '200px',
            }}
            color={'success'}>
            {loading === true ? (
              <Loading type='points-opacity' color='currentColor' size='sm' />
            ) : (
              'Conectar'
            )}
          </Button>
          <Button onClick={handleCloseSocket}>desconectar</Button>
          <Button onClick={handleOpenMonitor}>Monitor test</Button>
          {/* <Button onClick={() => setTest(emailRef.current.value)}>
            Change atom
          </Button>
          {test} */}
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default Home;
