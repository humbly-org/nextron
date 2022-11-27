import React, { useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Dashboard, Menu, PatientCard } from '../components';
import { Container } from '@nextui-org/react';
import { PatientQueue } from '../components/PatientQueue';
import { parseMessage, queueType } from '../utils/types';
import Modal from '../components/Modal';
import { useAtom } from 'jotai';
import {
  patientModalAtom,
  patientObjectAtom,
  patientsAtom,
  visibleAtom,
} from '../atom';
import CallingPatientModal from '../components/CallingPatientModal';
import { PatientType } from '../types';
import { SocketContext } from '../context';
import { observer } from 'mobx-react-lite';

function Next() {
  const store = useContext(SocketContext);
  const { socket, callPatient, connect, destroy, changeQueue } = store;

  const [visible, setVisible] = useAtom(visibleAtom);
  const [isVisiblePatientModal, setPatientModal] = useAtom(patientModalAtom);
  const [patientObject] = useAtom(patientObjectAtom);
  const [patients, setPatients] = useAtom(patientsAtom);
  const [patientCode, setPatientCode] = useState('');

  const filterMocks = (queueType: queueType, patients: PatientType[]) => {
    if (patients.length === 0 || patients[0] === undefined) return [];
    return patients.filter((mock) => mock.queueType === queueType);
  };

  console.log(patients);

  const callPatientRes = (data: any) => {
    if (data?.patientCode) setPatientCode(data.patientCode);
  };

  const handleCallPatient = (code) => {
    if (code === patientCode) {
      return changeQueue(patientObject.cpf);
    } else {
      return console.log('Not the same patient');
    }
  };

  const handleNewPatient = (data: PatientType) => {
    console.log(data);
    if (data?.cpf) {
      setPatients([...patients, data]);
    }
    return;
  };

  const updatedPatient = (data: PatientType) => {
    console.log(data, data.cpf);
    const updatedPatient = patients.filter(
      (patient) => patient.cpf !== data.cpf,
    );
    console.log(updatedPatient);
    setPatients([...updatedPatient, data]);
  };

  const mapperMessages = (data: any) => {
    const { message, body } = data;
    console.log(message, body);
    const object = {
      newPatient: handleNewPatient,
      callPatientRes: callPatientRes,
      updatedPatient: updatedPatient,
    };
    if (object[message]) return object[message](body);
    return console.log('Message not found');
  };

  useEffect(() => {
    connect();
  });

  useEffect(() => {
    if (socket?.on) {
      socket.on('data', (data: string) => {
        const message = parseMessage(data);
        mapperMessages(message);
      });
    }
  }, [store, socket]);

  return (
    <React.Fragment>
      <Dashboard>
        <Menu disconnect={destroy} />
        <Container
          css={{
            mw: 'inherit',
            p: '$0',
            pb: '$8',
            m: '0px',
            flexWrap: 'nowrap',
            height: '95vh',
          }}
          display='flex'>
          <PatientQueue
            title={'Na fila'}
            patientCount={filterMocks(queueType['onHold'], patients).length}>
            {filterMocks(queueType['onHold'], patients).map((patient) => (
              <PatientCard
                id={parseInt(patient.id)}
                key={parseInt(patient.id)}
                openModal={setVisible}
                {...patient}
              />
            ))}
          </PatientQueue>
          <PatientQueue
            title={'Em atendimento'}
            patientCount={
              filterMocks(queueType['inProgress'], patients).length
            }>
            {filterMocks(queueType['inProgress'], patients).map((patient) => (
              <PatientCard
                id={parseInt(patient.id)}
                key={parseInt(patient.id)}
                openModal={setVisible}
                {...patient}
              />
            ))}
          </PatientQueue>
          <PatientQueue
            title={'Finalizados'}
            patientCount={filterMocks(queueType['finished'], patients).length}>
            {filterMocks(queueType['finished'], patients).map((patient) => (
              <PatientCard
                id={parseInt(patient.id)}
                key={parseInt(patient.id)}
                openModal={setVisible}
                {...patient}
              />
            ))}
          </PatientQueue>
        </Container>
      </Dashboard>
      <Modal
        patientObject={patientObject}
        visible={visible}
        setVisible={setVisible}
        setCallingPatientVisible={setPatientModal}
        callPatient={callPatient}
      />
      <CallingPatientModal
        changeQueue={handleCallPatient}
        visible={isVisiblePatientModal}
        setVisible={setPatientModal}
      />
    </React.Fragment>
  );
}

export default observer(Next);
