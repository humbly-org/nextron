import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  changeQueue: (code) => boolean;
}

const MAX_COUNT = 1;
const INTERVAL = 3000;

export default function CallingPatientModal({
  visible,
  setVisible,
  changeQueue,
}: ICallingPatientModalProps) {
  const codeRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
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
    setErrorMessage('');
  };

  const confirmHandler = () => {
    const isValid = changeQueue(codeRef.current.value);
    if (isValid) {
      setVisible(false);
      resetCountdown();
      setErrorMessage('');
      console.log('confirmed');
    } else {
      codeRef.current.value = '';
      codeRef.current.focus();
      setErrorMessage('Código inválido!');
    }
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
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}>
          <div>
            <Text weight={'extrabold'} size='$xl'>
              O paciente chegou!
            </Text>
            <Text weight={'normal'} size='$sm'>
              peça o código do paciente e digite abaixo:
            </Text>
          </div>
          <Col
            css={{
              mt: '$4',
              gap: '$12',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Input
              helperText={errorMessage ?? ''}
              ref={codeRef}
              bordered
              size='lg'
              style={{
                fontWeight: 'bold',
                padding: '8px',
                fontSize: '26px',
              }}
              color={errorMessage ? 'error' : 'primary'}
              placeholder='Código do paciente'
            />
            <Col
              css={{
                gap: '$4',
                display: 'flex',
              }}>
              <Button size='sm' color='error' onClick={closeHandler}>
                Cancelar
              </Button>
              <Button size='sm' color='success' onClick={confirmHandler}>
                Iniciar
              </Button>
            </Col>
          </Col>
        </div>
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
        alignItems: 'space-evelyn',
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
