import React from 'react';
import Head from 'next/head';
import { Dashboard, Menu, PatientCard } from '../components';
import { Container } from '@nextui-org/react';
import { PatientQueue } from '../components/PatientQueue';
import {
  PatientMock,
  PatientMockFinished,
  PatientMockInProgress,
} from './mocks/patientMock';
import net from 'net';
import { queueType } from '../utils/types';
import { useQueue } from '../hooks/useQueue';
import Modal from '../components/Modal';
import { useAtom } from 'jotai';
import { patientModalAtom, patientObjectAtom, visibleAtom } from '../atom';
import CallingPatientModal from '../components/CallingPatientModal';

const mocks = [
  { ...PatientMock, id: Math.floor(Math.random() * 10) },
  { ...PatientMock, id: Math.floor(Math.random() * 10) },
  { ...PatientMock, id: Math.floor(Math.random() * 10) },
  { ...PatientMockInProgress, id: Math.floor(Math.random() * 10) },
  { ...PatientMockInProgress, id: Math.floor(Math.random() * 10) },
  { ...PatientMockInProgress, id: Math.floor(Math.random() * 10) },
  { ...PatientMockFinished, id: Math.floor(Math.random() * 10) },
  { ...PatientMockFinished, id: Math.floor(Math.random() * 10) },
  { ...PatientMockFinished, id: Math.floor(Math.random() * 10) },
];

const filterMocks = (queueType: queueType) => {
  return mocks.filter((mock) => mock.queueType === queueType);
};

function Next() {
  const { message } = useQueue();
  const [visible, setVisible] = useAtom(visibleAtom);
  const [isVisiblePatientModal, setPatientModal] = useAtom(patientModalAtom);
  const [patientObject] = useAtom(patientObjectAtom);
  console.log('message', message);

  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript)</title>
      </Head>
      <Dashboard>
        <Menu />
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
            patientCount={filterMocks(queueType['onHold']).length}>
            {filterMocks(queueType['onHold']).map((patient) => (
              <PatientCard
                key={patient.id}
                openModal={setVisible}
                {...patient}
              />
            ))}
          </PatientQueue>
          <PatientQueue
            title={'Em atendimento'}
            patientCount={filterMocks(queueType['inProgress']).length}>
            {filterMocks(queueType['inProgress']).map((patient) => (
              <PatientCard
                key={patient.id}
                openModal={setVisible}
                {...patient}
              />
            ))}
          </PatientQueue>
          <PatientQueue
            title={'Finalizados'}
            patientCount={filterMocks(queueType['finished']).length}>
            {filterMocks(queueType['finished']).map((patient) => (
              <PatientCard
                key={patient.id}
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
      />
      <CallingPatientModal
        visible={isVisiblePatientModal}
        setVisible={setPatientModal}
      />
    </React.Fragment>
  );
}

export default Next;
