import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Container, Input, Text } from '@nextui-org/react';
import Image from 'next/image';

import { useContext } from 'react';
import { SocketContext } from '../context';
import { useRouter } from 'next/router';

function Home() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const store = useContext(SocketContext);
  const { socket, connect, destroy, callPatient } = store;

  const handleOpenMonitor = () => {
    window.open(
      '/monitor',
      '_blank',
      'top=500, left=200,contextIsolation=no,nodeIntegration=yes',
    );
  };

  const handleConnect = () => {
    router.push('/next');
  };

  return (
    <React.Fragment>
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
          <Button
            onClick={handleConnect}
            css={{
              w: '200px',
            }}
            color={'success'}>
            Connect
          </Button>
          <Button onClick={handleOpenMonitor}>montitor</Button>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default observer(Home);
