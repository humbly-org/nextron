import React from 'react';
import {
  Modal as NUIModal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Col,
} from '@nextui-org/react';

interface IModalProps {
  visible: boolean;
  setVisible: (boolean) => void;
  callPatient: (cpf) => void;
  setCallingPatientVisible: (boolean) => void;
  patientObject: {
    id: number;
    name: string;
    cpf: string;
  };
}

export default function Modal({
  patientObject,
  visible,
  setVisible,
  setCallingPatientVisible,
  callPatient,
}: IModalProps) {
  const { name = 'Fulaninho', cpf = '218.321.542-34' } = patientObject;
  const closeHandler = () => {
    setVisible(false);
  };
  const confirmHandler = () => {
    callPatient(cpf);
    setVisible(false);
    setCallingPatientVisible(true);
  };

  return (
    <NUIModal
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
          Você está prestes a chamar o paciente:
          <Text
            css={{
              mt: '$4',
            }}
            as={'p'}
            size='$xl'
            weight={'normal'}>
            {name}
          </Text>
        </Text>
      </NUIModal.Header>
      <Col
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text css={{ mr: '$4' }} size={24}>
          CPF:
        </Text>
        <Text size={24} weight='black'>
          {cpf}
        </Text>
      </Col>
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
            Confirmar
          </Button>
        </Row>
      </NUIModal.Footer>
    </NUIModal>
  );
}
