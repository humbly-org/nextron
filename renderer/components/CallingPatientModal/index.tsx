import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal as NUIModal,
  Button,
  Text,
  Row,
  Col,
  Progress,
  Spinner,
  Loading,
  Input,
} from '@nextui-org/react';
import { useCountdown } from '../../hooks';

interface ICallingPatientModalProps {
  visible: boolean;
  setVisible: (boolean) => void;
}

const MAX_COUNT = 1;
const INTERVAL = 3000;

export default function CallingPatientModal({
  visible,
  setVisible,
}: ICallingPatientModalProps) {
  const [loading, setLoading] = useState(false);
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: MAX_COUNT,
      intervalMs: intervalValue,
    });

  useEffect(() => {
    if (visible && count > 0) {
      startCountdown();
    }
  });

  useEffect(() => {
    if (count === 0) {
      setLoading(true);
      stopCountdown();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [count]);

  const closeHandler = () => {
    setVisible(false);
    resetCountdown();
    console.log('closed');
  };

  const modalState = {
    notFinished: (
      <>
        <Text weight={'extrabold'} size='$xl'>
          Chamando...
        </Text>
        <Text span size={'$md'}>
          Aguarde{' '}
          <Text weight={'extrabold'} span>
            {count}
          </Text>{' '}
          segundos
        </Text>
        <Text weight={'normal'} span>
          para que o paciente chegue até você!
        </Text>
        <Row
          css={{
            px: '$4',
            my: '$10',
          }}>
          <Progress
            value={count}
            max={MAX_COUNT}
            min={0}
            shadow
            color='primary'
            status='primary'
          />
        </Row>
      </>
    ),
    finished: (
      <>
        <Text>
          <Text weight={'extrabold'} size='$xl'>
            O paciente chegou!
          </Text>
          <Text weight={'normal'} size='$sm'>
            peça o código do paciente e digite abaixo:
          </Text>
          <Col
            css={{
              mt: '$4',
              gap: '$8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Input bordered placeholder='Código do paciente' />
            <Col
              css={{
                gap: '$4',
                display: 'flex',
              }}>
              <Button size='sm' color='error' onClick={closeHandler}>
                Cancelar
              </Button>
              <Button size='sm' color='success' onClick={closeHandler}>
                Iniciar
              </Button>
            </Col>
          </Col>
        </Text>
      </>
    ),
  };

  return (
    <NUIModal
      width='400px'
      preventClose
      aria-labelledby='modal-title'
      open={visible}
      css={{
        height: '300px',
        p: '$16',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={closeHandler}>
      {!loading ? (
        <>{count > 0 ? modalState.notFinished : modalState.finished}</>
      ) : (
        <Loading color='primary' />
      )}
    </NUIModal>
  );
}
