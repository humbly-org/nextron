import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dashboard, Menu } from '../components';
import { parseMessage, queueType } from '../utils/types';
import net from 'net';
import OnHoldModal from '../components/OnHoldModal';
import InProgressModal from '../components/InProgressModal';
import { useAtom, useSetAtom } from 'jotai';
import {
  patientModalAtom,
  patientObjectAtom,
  visibleAtom,
  updatePatientAtom,
  addPatientAtom,
  firstPatientsAtom,
  disconnectedModalAtom,
} from '../atom';
import CallingPatientModal from '../components/CallingPatientModal';
import { PatientType } from '../types';
import { SocketContext } from '../context';
import { observer } from 'mobx-react-lite';
import { QueueContainer } from '../components/QueueContainer';
import { useRouter } from 'next/router';
import DisconnectedModal from '../components/DisconnectedModal';

function Next() {
  const store = useContext(SocketContext);
  const {
    socket,
    callPatient,
    connect,
    destroy,
    changeQueue,
    connected,
    hospitalLogin,
  } = store;

  const router = useRouter();
  const [visible, setVisible] = useAtom(visibleAtom);
  const [isVisiblePatientModal, setPatientModal] = useAtom(patientModalAtom);
  const [patientObject] = useAtom(patientObjectAtom);
  const addPatients = useSetAtom(addPatientAtom);
  const setVisibleDisconnectedModal = useSetAtom(disconnectedModalAtom);
  const setPatients = useSetAtom(firstPatientsAtom);
  const updatePatients = useSetAtom(updatePatientAtom);
  const [patientCode, setPatientCode] = useState('');

  const callPatientRes = (data: any) => {
    if (data?.patientCode) setPatientCode(data.patientCode);
  };

  const handleCallPatient = (code) => {
    if (code === patientCode) {
      changeQueue(patientObject.cpf, 'inProgress');
      return true;
    } else {
      return false;
    }
  };

  const updateQueue = (cpf) => {
    return changeQueue(cpf, 'finished');
  };

  const handleNewPatient = (data: PatientType) => {
    console.log(data);
    if (data?.cpf) {
      addPatients(data);
    }
    return;
  };

  const updatePatient = (data: PatientType) => {
    if (data?.cpf) {
      updatePatients(data);
    }
  };

  const newConnection = useCallback((data: { patients: PatientType[] }) => {
    if (data.patients.length > 0) {
      setPatients(data.patients);
    }
  }, []);

  const mapperMessages = (data: any) => {
    const { message, body } = data;
    console.log(data);
    const object = {
      newPatient: () => handleNewPatient(body),
      callPatientRes: () => callPatientRes(body),
      updatedPatient: () => updatePatient(body),
      hospitalLoginRes: () => newConnection(body),
    };
    if (object[message]) return object[message](body);
    return console.log('Message not found');
  };

  const connectSocket = async () => {
    const connection = await connect();
    return connection;
  };

  useEffect(() => {
    connectSocket();
    if (!connected) {
      setVisibleDisconnectedModal(true);
    } else setVisibleDisconnectedModal(false);
  }, [socket, hospitalLogin, connected]);

  useEffect(() => {
    if ((socket as net.Socket)?.on) {
      (socket as net.Socket).on('data', (data: string) => {
        const message = parseMessage(data);
        mapperMessages(message);
      });
    }
  }, [socket]);

  return (
    <React.Fragment>
      <Dashboard>
        <Menu disconnect={destroy} />
        <QueueContainer setVisible={setVisible} />
      </Dashboard>
      <OnHoldModal
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
      <InProgressModal
        patientObject={patientObject}
        updateQueue={updateQueue}
      />
      <DisconnectedModal />
    </React.Fragment>
  );
}

export default observer(Next);
