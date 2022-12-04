import React, { useContext, useState } from 'react';
import {
  Modal as NUIModal,
  Button,
  Text,
  Row,
  Loading,
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { disconnectedModalAtom } from '../../atom';
import { SocketContext } from '../../context';
import { useRouter } from 'next/router';

export default function DisconnectedModal() {
  const [visible, setVisible] = useAtom(disconnectedModalAtom);
  const [loading, setLoading] = useState(false);
  const store = useContext(SocketContext);
  const router = useRouter();
  const { connect, connected } = store;

  const closeHandler = () => {
    setVisible(false);
    if (connected) return;
    router.push('/home');
  };
  const confirmHandler = async () => {
    setLoading(true);
    await connect();
    router.reload();
    setLoading(false);
  };

  return (
    <NUIModal
      blur
      preventClose
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeHandler}>
      <NUIModal.Header>
        <Text
          id='modal-title'
          css={{
            lineHeight: '1.2',
          }}
          weight='extrabold'
          size={'$3xl'}>
          Servidor inativo! Por favor, reinicie o servidor e tente novamente.
        </Text>
      </NUIModal.Header>
      <NUIModal.Footer>
        <Row
          justify='center'
          css={{
            gap: '$4',
          }}>
          <Button auto flat color='error' onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto color='success' onClick={confirmHandler}>
            {loading ? (
              <Loading color='currentColor' size='md' />
            ) : (
              'Reconectar'
            )}
          </Button>
        </Row>
      </NUIModal.Footer>
    </NUIModal>
  );
}
