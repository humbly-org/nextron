import React from 'react';
import { Modal as NUIModal, Button, Text, Row, Col } from '@nextui-org/react';
import { PatientType } from '../../types';
import { useSetAtom } from 'jotai';
import { calledPatientAtom } from '../../atom';

interface IOnHoldModalProps {
  visible: boolean;
  setVisible: (boolean) => void;
  callPatient: (cpf) => void;
  setCallingPatientVisible: (boolean) => void;
  patientObject?: PatientType;
}

export default function OnHoldModal({
  patientObject,
  visible,
  setVisible,
  setCallingPatientVisible,
  callPatient,
}: IOnHoldModalProps) {
  const setCalledPatient = useSetAtom(calledPatientAtom);
  const { name, cpf } = patientObject || { name: '', cpf: '' };
  const closeHandler = () => {
    setVisible(false);
  };
  const confirmHandler = () => {
    setCalledPatient(patientObject);
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
            {name || ''}
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
          {cpf || ''}
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
